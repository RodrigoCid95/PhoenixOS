import { IDriverManager, IKernel, ITaskManager, IOS } from 'phoenix-builder'
import { TaskManager } from 'clasess/task-manager'
import { DriverManager } from 'drivers'

export class Kernel implements IKernel {
  #TaskManager: TaskManager = new TaskManager()
  #DriverManager: DriverManager = new DriverManager()
  get TaskManager(): ITaskManager {
    return this.#TaskManager
  }
  get DriverManager(): IDriverManager {
    return this.#DriverManager
  }
  async run(): Promise<void> {
    let url = localStorage.getItem('url-service') || window.location.origin
    let checkScope = false
    do {
      const osURL = `${url}/js/os/main.js`
      checkScope = await new Promise(resolve => fetch(osURL).then(res => resolve(res.ok)).catch(() => resolve(false)))
      if (!checkScope) {
        url = prompt('La conexión a tu servidor falló, ingresa una URL válida.', url) || window.location.origin
      }
    } while (!checkScope);
    localStorage.setItem('url-service', url)
    const emitters = await this.#DriverManager.getDriver('emitters')
    this.#TaskManager.setEmitterDriver(emitters)
    await this.#DriverManager.getDriver('server', { url })
    const osURL = `${url}/js/os/main.js`
    try {
      const { default: OS }: { default: IOS } = await import(osURL)
      new OS(this)
    } catch (error) {
      this.run()
    }
  }
}
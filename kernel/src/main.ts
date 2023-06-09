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
    const Emmiters = await this.#DriverManager.getDriver('emitters')
    this.#TaskManager.setEmitterDriver(Emmiters)
    const { main } = await fetch('/js/os.json').then(res => res.json())
    const osPath = `/js/${main}`
    const { default: OS } = await import(osPath)
    new OS(this)
  }
}
import { Kernel } from 'phoenix-core'
import { AppModule } from 'phoenix-core/types/app'
import { Manifest } from 'phoenix-core/types/task-manager'
import { EmittersDriver } from 'phoenix-core/types/drivers/emitter'
import { WindowComponent } from './window'

class PhoenixOS extends Kernel {
  #emitters!: EmittersDriver
  constructor() {
    super()
    this.#init()
  }
  async #init() {
    await this.#showSplashScreen()
    await this.#loadUI()
    const eDriver = await this.DriverManager.getDriver('emitters')
    this.#emitters = new eDriver()
    this.#emitters.on('auth', async auth => {
      await this.#showSplashScreen()
      const { tasks } = this.TaskManager
      for (const task of tasks) {
        await task.kill()
      }
      if (typeof auth === 'boolean') {
        if (auth) {
          await this.#loadDesktop()
        } else {
          await this.#loadLogin()
        }
      } else {
        window.location.reload()
      }
    })
    this.#emitters.emmit('auth', true)
  }
  async #showSplashScreen(): Promise<void> {
    const { AppSplashScreen } = await import('./splash-screen')
    const task = this.TaskManager.run<HTMLDivElement>({
      manifest: {
        packageName: 'com.splash.screen',
        title: 'Pantalla de carga'
      },
      module: {
        Views: {
          prefix: 'splash',
          Index: AppSplashScreen as any
        }
      },
      system: true
    })
    document.body.innerHTML = ''
    document.body.append(task.el)
  }
  async #loadUI(): Promise<void> {
    const uiPath = '/js/ionicui/index.esm.js'
    const { initUI } = await import(uiPath)
    const config = JSON.parse(localStorage.getItem('ion-config') || '{}');
    (window as any).Ionic = { config }
    await initUI()
  }
  async #loadLogin(): Promise<void> {
    const { default: AppLoginController } = await import('./login')
    Object.defineProperty(AppLoginController.prototype, 'emitters', { value: this.#emitters, writable: false })
    const task = this.TaskManager.run<HTMLDivElement>({
      manifest: {
        packageName: 'com.login.app',
        title: 'Iniciar sesión'
      },
      module: {
        Views: {
          prefix: 'login',
          Index: AppLoginController as any
        }
      },
      system: true
    })
    document.body.innerHTML = ''
    document.body.append(task.el)
  }
  async #loadDesktop(): Promise<void> {
    const { default: AppDesktopController } = await import('./desktop')
    Object.defineProperty(AppDesktopController.prototype, 'taskManager', { value: this.TaskManager, writable: false })
    Object.defineProperty(AppDesktopController.prototype, 'emitters', { value: this.#emitters, writable: false })
    const task = this.TaskManager.run<HTMLDivElement>({
      manifest: {
        packageName: 'com.desktop.app',
        title: 'Entorno gráfico.'
      },
      module: {
        Views: {
          prefix: 'desktop',
          Index: AppDesktopController as any,
          others: {
            launcher: async () => {
              const { default: LauncherController } = await import('./desktop/launcher')
              Object.defineProperty(LauncherController.prototype, 'emitters', { value: this.#emitters, writable: false })
              Object.defineProperty(LauncherController.prototype, 'taskManager', { value: this.TaskManager, writable: false })
              return { default: LauncherController as any }
            },
            'launcher-list': async () => {
              const { default: LauncherListController } = await import('./desktop/launcher/list')
              Object.defineProperty(LauncherListController.prototype, 'emitters', { value: this.#emitters, writable: false })
              Object.defineProperty(LauncherListController.prototype, 'launch', {
                value: async (manifest: Manifest) => {
                  const pathApp = `/js/apps/${manifest.packageName}/main.js`
                  const { default: module }: { default: AppModule } = await import(pathApp)
                  const task = this.TaskManager.run({
                    manifest,
                    module,
                    Container: class extends WindowComponent {
                      onMount() {
                        const indexTagName = `${module.Views.prefix}-index`
                        this.innerHTML = `<ion-nav root="${indexTagName}"></ion-nav>`
                      }
                    },
                    system: false
                  })
                  this.#emitters.emmit('add-app', task)
                }, writable: false
              })
              return { default: LauncherListController as any }
            },
            'launcher-settings': async () => {
              const { default: LauncherSettingsController } = await import('./desktop/launcher/settings')
              Object.defineProperty(LauncherSettingsController.prototype, 'emitters', { value: this.#emitters, writable: false })
              return { default: LauncherSettingsController as any }
            },
            'task-manager': async () => {
              const { default: TaskManagerController } = await import('./desktop/task-manager')
              Object.defineProperty(TaskManagerController.prototype, 'taskManager', { value: this.TaskManager, writable: false })
              return { default: TaskManagerController }
            }
          }
        }
      },
      system: true
    })
    document.body.innerHTML = ''
    document.body.append(task.el)
  }
}

Object.defineProperty(window, 'os', { value: new PhoenixOS(), writable: false })
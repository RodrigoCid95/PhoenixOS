import { AppModule, IEmitters, IKernel, IManifest, IService, OtherViews, ViewControllerConstructable, WindowComponent } from 'phoenix-builder'
import _spStyles from 'splash-screen/styles.scss'
import _spTemplate from 'splash-screen/template.html'

class AppSplashScreen extends window.ViewController {
  static styles = [_spStyles]
  static shadowTemplate = _spTemplate
}

export default class {
  #emitters!: IEmitters
  constructor(private kernel: IKernel) {
    this.#init()
  }
  #getService<S = IService>(serviceName: string): S {
    console.log(serviceName)
    throw new Error('Function not implemented.')
  }
  #showSplashScreen(): void {
    this.kernel.defineWebComponent({
      tagName: 'splash-screen',
      Controller: AppSplashScreen,
      shadowTemplate: AppSplashScreen.shadowTemplate
    })
    document.body.innerHTML = '<splash-screen></splash-screen>'
  }
  async #loadUI(): Promise<void> {
    const uiPath = '/js/ionicui/index.esm.js'
    await import(uiPath).then(({ initUI }) => initUI())
  }
  async #loadLogin(): Promise<void> {
    const { default: AppLoginController } = await import('login')
    this.kernel.defineWebComponent({
      tagName: 'app-login',
      Controller: AppLoginController
    })
    const appLogin = document.createElement('app-login')
    document.body.innerHTML = ''
    document.body.append(appLogin)
    await new Promise(resolve => appLogin.addEventListener('onAuth', resolve))
  }
  async #prepareEmitter(): Promise<IEmitters> {
    const eDriver = await this.kernel.DriverManager.getDriver('emitters')
    const emitters = new eDriver()
    emitters.on('define-components', ({ tagName, Controller }: { tagName: string, Controller: ViewControllerConstructable }) => this.kernel.defineWebComponent({ tagName, Controller }))
    emitters.on('launch', this.#launch.bind(this))
    return emitters
  }
  async #loadDesktop(): Promise<void> {
    const emitters = await this.#prepareEmitter()
    const { default: AppDesktopController } = await import('desktop')
    Object.defineProperty(AppDesktopController.prototype, 'emitters', {
      get() {
        return emitters
      }
    })
    this.kernel.defineWebComponent({
      tagName: 'app-desktop',
      Controller: AppDesktopController
    })
    this.#emitters = emitters
    document.body.innerHTML = '<app-desktop></app-desktop>'
  }
  async #init() {
    this.#showSplashScreen()
    await this.#loadUI()
    await this.#loadLogin()
    this.#showSplashScreen()
    this.#loadDesktop()
  }
  async #launch({ packageName, title, description, icon }: IManifest, args: string[] = []): Promise<void> {
    const { default: { prefix, Views: { Index, others = {} } } }: PackageModule = await import(`/js/apps/${packageName}/main.js`)
    const tagName = packageName.toLowerCase().split('.').join('-')
    if (!window.customElements.get(tagName)) {
      const { WindowComponent } = await import('./window')
      const { kernel } = this
      const getService = this.#getService.bind(this)
      window.customElements.define(tagName, class extends WindowComponent {
        onMount = async () => {
          const indexTagName = `${prefix}-view-index`
          const windowInstance = this
          kernel.defineWebComponent({
            tagName: indexTagName,
            Controller: Index,
            prepareInstace(instance) {
              Object.defineProperty(instance, 'windowElement', {
                get() {
                  return windowInstance
                }
              })
              return instance
            }
          })
          this.innerHTML = `<ion-nav root="${indexTagName}"></ion-nav>`
          if (others) {
            const viewNames: Lowercase<string>[] = Object.keys(others) as any
            for (const viewName of viewNames) {
              kernel.defineWebComponent({
                tagName: `${prefix}-page-${viewName}`,
                Controller: others[viewName],
                prepareInstace(instance) {
                  Object.defineProperty(instance, 'windowElement', {
                    get() {
                      return windowInstance
                    }
                  })
                  return instance
                }
              })
            }
          }
        }
      })
    }
    const app = document.createElement(tagName)
    const newTask = this.kernel.TaskManager.add<WindowComponent>({
      title,
      description: description || '',
      icon,
      el: app
    })
    app.addEventListener('onClose', () => newTask.kill())
    this.#emitters.emmit('add-app', newTask)
  }
}

type PackageModule = {
  default: AppModule
}
type DefineWindowOptions = {
  tag: string
  Controller: ViewControllerConstructable
  useNav: boolean
  args: string[]
}
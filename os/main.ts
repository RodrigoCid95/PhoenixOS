import { AppModule, IDriverList, IEmitters, ICore, IManifest, ServiceClass, ViewControllerConstructable, WindowComponent } from 'phoenix-builder'
import _spStyles from './splash-screen/styles.scss'
import _spTemplate from './splash-screen/template.html'

class AppSplashScreen extends window.ViewController {
  static styles = [_spStyles]
  static shadowTemplate = _spTemplate
}

export default class {
  #emitters!: IEmitters
  constructor(private core: ICore) {
    this.#init()
  }
  #showSplashScreen(): void {
    this.core.defineWebComponent({
      tagName: 'splash-screen',
      Controller: AppSplashScreen,
      shadowTemplate: AppSplashScreen.shadowTemplate
    })
    document.body.innerHTML = '<splash-screen></splash-screen>'
  }
  async #loadUI(): Promise<void> {
    const uiPath = '/js/ionicui/index.esm.js'
    const { initUI } = await import(uiPath)
    const config = JSON.parse(localStorage.getItem('config') || '{}');
    (window as any).Ionic = { config }
    await initUI()
  }
  async #loadLogin(): Promise<void> {
    const { default: AppLoginController } = await import('./login')
    this.core.defineWebComponent({
      tagName: 'app-login',
      Controller: AppLoginController
    })
    const appLogin = document.createElement('app-login')
    document.body.innerHTML = ''
    document.body.append(appLogin)
    await new Promise(resolve => appLogin.addEventListener('onAuth', resolve))
  }
  async #loadDesktop(): Promise<void> {
    const eDriver = await this.core.DriverManager.getDriver('emitters')
    const emitters = new eDriver()
    const { default: AppDesktopController } = await import('./desktop')
    Object.defineProperty(AppDesktopController.prototype, 'defineComponent', { value: this.core.defineWebComponent.bind(this.core), writable: false })
    Object.defineProperty(AppDesktopController.prototype, 'launch', { value: this.launch.bind(this), writable: false })
    Object.defineProperty(AppDesktopController.prototype, 'emitters', { value: emitters, writable: false })
    this.core.defineWebComponent({
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
  async launch({ packageName, title, description, icon, dependences = [] }: IManifest): Promise<void> {
    const { default: { prefix, Views: { Index, others = {} }, Services = {} } }: PackageModule = await import(`/js/apps/${packageName}/main.js`)
    const tagName = packageName.toLowerCase().split('.').join('-')
    if (!window.customElements.get(tagName)) {
      const { core } = this
      const services = new Map<string, ServiceClass>()
      const servicesDeclarations = new Map<string, ServiceClass>()
      const nameServices = Object.keys(Services)
      const getDriver = async (name: keyof IDriverList) => {
        if (!dependences.includes(name)) {
          throw new DriverPermissionDenied(name)
        }
        return await this.core.DriverManager.getDriver(name)
      }
      const getService = async (name: string) => {
        if (nameServices.length === 0) {
          throw new WithOutServices()
        }
        if (!nameServices.includes(name)) {
          throw new ServiceNotExist(name)
        }
        if (!services.has(name)) {
          if (!servicesDeclarations.has(name)) {
            let sd = Services[name]
            if (!sd.isService) {
              sd = (await sd()).default
            }
            Object.defineProperty(sd.prototype, 'getDriver', {
              get() {
                return getDriver
              }
            })
            servicesDeclarations.set(name, sd)
          }
          const SD: any = servicesDeclarations.get(name)
          services.set(name, new SD())
        }
        return services.get(name)
      }
      const { WindowComponent } = await import('./window')
      window.customElements.define(tagName, class extends WindowComponent {
        onMount = async () => {
          const indexTagName = `${prefix}-view-index`
          this.innerHTML = `<ion-nav root="${indexTagName}"></ion-nav>`
          const prepareControllerClass = (definition: ViewControllerConstructable) => {
            Object.defineProperty(definition.prototype, 'getService', {
              value: getService,
              writable: false
            })
            Object.defineProperty(definition.prototype, 'windowElement', {
              get() {
                return this.viewElement?.parentElement?.parentElement
              }
            })
            return definition
          }
          core.defineWebComponent({
            tagName: indexTagName,
            Controller: Index,
            prepareControllerClass
          })
          if (others) {
            const viewNames: Lowercase<string>[] = Object.keys(others) as any
            for (const viewName of viewNames) {
              core.defineWebComponent({
                tagName: `${prefix}-page-${viewName}`,
                Controller: others[viewName],
                prepareControllerClass
              })
            }
          }
        }
      })
    }
    const app = document.createElement(tagName)
    const newTask = this.core.TaskManager.add<WindowComponent>({
      title,
      description: description || '',
      icon,
      el: app
    })
    app.addEventListener('onClose', () => newTask.kill())
    this.#emitters.emmit('add-app', newTask)
  }
}

class ServiceNotExist extends Error {
  constructor(nameService: string) {
    super(`El servicio "${nameService}" no existe!`)
    this.name = 'ServiceNotExist'
  }
}

class WithOutServices extends Error {
  constructor() {
    super('No se definieron dependencias!')
    this.name = 'WithOutServices'
  }
}

class DriverPermissionDenied extends Error {
  constructor(name: string) {
    super(`No tienes permiso para usar el driver "${name}"`)
    this.name = 'DriverPermissionDenied'
  }
}

class Service {
  static isService: boolean
}
Object.defineProperty(window, 'Service', {
  get() {
    return Service
  }
})

type PackageModule = {
  default: AppModule
}

import { AppModule, IEmitters, IKernel, IManifest, IService, OtherViews, WindowComponent } from 'phoenix-builder'
import _spStyles from 'splash-screen/styles.scss'
import _spTemplate from 'splash-screen/template.html'

class AppSplashScreen extends window.Controller {
  static styles = [_spStyles]
  static shadowTemplate = _spTemplate
  static shadow = true
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
      getService: this.#getService.bind(this)
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
      Controller: AppLoginController,
      getService: this.#getService.bind(this)
    })
    const appLogin = document.createElement('app-login')
    document.body.innerHTML = ''
    document.body.append(appLogin)
    await new Promise(resolve => appLogin.addEventListener('onAuth', resolve))
  }
  async #prepareEmitter(): Promise<IEmitters> {
    const eDriver = await this.kernel.DriverManager.getDriver('emitters')
    const emitters = new eDriver()
    emitters.on('define-components', ({ tagName, Controller, args }: { tagName: string, Controller: ControllerClassConstructable, args: string[] }) => this.kernel.defineWebComponent({ tagName, Controller, args, getService: this.#getService.bind(this) }))
    emitters.on('launch', this.#launch.bind(this))
    return emitters
  }
  async #loadDesktop(): Promise<void> {
    this.#emitters = await this.#prepareEmitter()
    const { default: initDesktop } = await import('desktop')
    initDesktop(this.#emitters)
    document.body.innerHTML = '<app-desktop></app-desktop>'
  }
  async #init() {
    this.#showSplashScreen()
    await this.#loadUI()
    await this.#loadLogin()
    this.#showSplashScreen()
    this.#loadDesktop()
  }
  async #defineWindow({ tag, Controller, useNav, args }: DefineWindowOptions ) {
    const tagName = useNav ? tag : (Controller as any).tag || tag
    const getService = this.#getService.bind(this)
    if (!window.customElements.get(tagName)) {
      if (useNav) {
        this.kernel.defineWebComponent({
          tagName: Controller.tag,
          Controller,
          getService: this.#getService.bind(this)
        })
      }
      const { WindowComponent } = await import('./window')
      window.customElements.define(tagName, class extends WindowComponent {
        onMount = () => {
          this.innerHTML = useNav ? `<ion-nav root="${Controller.tag}"></ion-nav>` : Controller.innerTemplate || ''
          if (!useNav) {
            if (Controller.shadowTemplate && this.shadowRoot) {
              this.shadowRoot.innerHTML = Controller.shadowTemplate
            }
            if (Controller.styles && this.shadowRoot) {
              for (const styleSheet of Controller.styles) {
                this.shadowRoot.adoptedStyleSheets.push(styleSheet)
              }
            }
            const instance = new Controller(...args)
            instance.element = this
            instance.getService = getService
            if (instance.onMount) {
              instance.onMount()
            }
            if (instance.onClose) {
              this.onClose = instance.onClose.bind(instance)
            }
          }
        }
      })
    }
  }
  async #launch({ packageName, title, description, icon }: IManifest, args: string[] = []): Promise<void> {
    const { default: { Views: { Index, others = {} } } }: { default: AppModule } = await import(`/js/apps/${packageName}/main.js`)
    const useNav = Object.keys(others).length > 0
    packageName = packageName.toLowerCase().split('.').join('-')
    await this.#defineWindow({
      tag: packageName,
      Controller: Index,
      useNav,
      args
    })
    if (others) {
      const tags: Lowercase<string>[] = Object.keys(others) as any
      for (const tagName of tags) {
        const Controller = others[tagName]
        this.kernel.defineWebComponent({
          tagName,
          Controller,
          getService: this.#getService.bind(this)
        })
      }
    }
    const app = document.createElement(useNav ? packageName : (Index as any).tag || packageName)
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

type DefineWindowOptions = {
  tag: string
  Controller: IndexControllerClassConstructable
  useNav: boolean
  args: string[]
}
import { AppModule, ControllerClass, IController, IEmitters, IKernel, IManifest, IService, IndexControllerClass, WindowComponent } from 'phoenix-builder'
import _spStyles from 'splash-screen/styles.scss'
import _spTemplate from 'splash-screen/template.html'

class AppSplashScreen implements IController {
  static styles = [_spStyles]
  static shadowTemplate = _spTemplate
  static shadow = true
}

export default class {
  #emitters!: IEmitters
  constructor(private kernel: IKernel) {
    (window as any).tm = this.kernel.TaskManager
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
    emitters.on('define-components', ({ tagName, Controller, args }: { tagName: string, Controller: ControllerClass, args: string[] }) => this.kernel.defineWebComponent({ tagName, Controller, args, getService: this.#getService.bind(this) }))
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
  async #defineWindow(
    { tag, Controller, useNav, args }: {
      tag: string
      Controller: IndexControllerClass
      useNav: boolean,
      args: string[]
    }
  ) {
    const tagName = useNav ? tag : Controller.tag
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
    packageName = packageName.toLowerCase().split('.').join('-')
    await this.#defineWindow({
      tag: packageName,
      Controller: Index,
      useNav: Object.keys(others).length > 0,
      args
    })
    if (others) {
      const tags: any[] = Object.keys(others)
      for (const tagName of tags) {
        const Controller = tags[tagName]
        this.kernel.defineWebComponent({
          tagName,
          Controller,
          getService: this.#getService.bind(this)
        })
      }
    }
    const app = document.createElement(packageName)
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
import { ViewControllerClass, DefineWebComponentOptions, IDriverManager, IKernel, ITaskManager } from 'phoenix-builder'
import { TaskManager } from 'clasess/task-manager'
import { DriverManager } from 'drivers'

class Kernel implements IKernel {
  #TaskManager: TaskManager = new TaskManager()
  #DriverManager: DriverManager = new DriverManager()
  get TaskManager(): ITaskManager {
    return this.#TaskManager
  }
  get DriverManager(): IDriverManager {
    return this.#DriverManager
  }
  constructor() {
    this.run()
  }
  async run(): Promise<void> {
    const eDriver = await this.#DriverManager.getDriver('emitters')
    const emmiters = new eDriver()
    this.#TaskManager.setEmitterDriver(emmiters)
    const { main } = await fetch('/js/os.json').then(res => res.json())
    const osPath = `/js/${main}`
    const { default: OS } = await import(osPath)
    new OS(this)
  }
  defineWebComponent({ tagName, Controller, getService, args }: DefineWebComponentOptions): void {
    if (!customElements.get(tagName)) {
      let C: any = Controller
      customElements.define(tagName, class extends HTMLElement {
        #instanceController!: ViewControllerClass
        async connectedCallback(): Promise<void> {
          if (C.isController) {
            this.#instanceController = new C(...args || [])
          } else {
            C = (await C()).default
            this.#instanceController = new C(...args || [])
          }
          const _this = this
          Object.defineProperty(C.prototype, 'viewElement', {
            get() {
              return _this
            }
          })
          if (C.shadow || C.shadowTemplate) {
            this.attachShadow({ mode: 'open' })
          }
          if (C.shadowTemplate && this.shadowRoot) {
            this.shadowRoot.innerHTML = C.shadowTemplate
          }
          if (C.innerTemplate) {
            this.innerHTML = C.innerTemplate
          }
          if (C.styles) {
            if (this.shadowRoot) {
              for (const styleSheet of C.styles) {
                this.shadowRoot.adoptedStyleSheets.push(styleSheet)
              }
            } else {
              const styles = []
              for (const { cssRules } of C.styles) {
                let css: string[] = []
                for (let index = 0; index < cssRules.length; index++) {
                  const rule = cssRules.item(index)
                  css.push(rule?.cssText || '')
                }
                styles.push(css.join('\n'))
              }
              const stylesElement = document.createElement('style')
              stylesElement.innerHTML = styles.join('\n')
              this.insertAdjacentElement('afterbegin', stylesElement)
            }
          }
          this.#instanceController.getService = getService
          if (this.#instanceController.onMount) {
            this.#instanceController.onMount()
          }
        }
        disconnectedCallback(): void {
          if (this.#instanceController && this.#instanceController.onClose) {
            this.#instanceController.onClose()
          }
        }
      })
    }
  }
}

class IndexController {
  static isController: boolean
}
IndexController.isController = true;
class Controller {
  static isController: boolean
}
Controller.isController = true;
(window as any).IndexController = IndexController;
(window as any).Controller = Controller

new Kernel()
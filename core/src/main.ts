import { ViewControllerClass, DefineWebComponentOptions, IDriverManager, ICore, ITaskManager, ViewControllerConstructable } from 'phoenix-builder'
import { TaskManager } from 'clasess/task-manager'
import { DriverManager } from 'drivers'

class Core implements ICore {
  #TaskManager: TaskManager = new TaskManager()
  #DriverManager: DriverManager = new DriverManager()
  #viewControllers: Map<string, ViewControllerConstructable>
  get TaskManager(): ITaskManager {
    return this.#TaskManager
  }
  get DriverManager(): IDriverManager {
    return this.#DriverManager
  }
  constructor() {
    this.#viewControllers = new Map()
    this.run()
  }
  async run(): Promise<void> {
    const eDriver = await this.#DriverManager.getDriver('emitters')
    const emmiters = new eDriver()
    this.#TaskManager.setEmitterDriver(emmiters)
    const osPath = '/js/os/main.js'
    const { default: OS } = await import(osPath)
    new OS(this)
  }
  defineWebComponent({ tagName, Controller, prepareControllerClass, prepareInstace, shadowTemplate = '<slot></slot>' }: DefineWebComponentOptions): void {
    const viewControllers = this.#viewControllers
    if (!customElements.get(tagName)) {
      let C: any = Controller
      customElements.define(tagName, class extends HTMLElement {
        #instanceController!: ViewControllerClass
        async connectedCallback(): Promise<void> {
          if (viewControllers.has(tagName)) {
            C = viewControllers.get(tagName)
          } else {
            if (!C.isController) {
              C = (await C()).default
            }
            viewControllers.set(tagName, C)
            if (prepareControllerClass) {
              C = prepareControllerClass(C)
            }
          }
          if (C.shadow) {
            this.attachShadow({ mode: 'open' })
          }
          if (this.shadowRoot) {
            this.shadowRoot.innerHTML = shadowTemplate
          }
          if (prepareInstace) {
            this.#instanceController = prepareInstace(new C())
          } else {
            this.#instanceController = new C()
          }
          const _this = this
          Object.defineProperty(this.#instanceController, 'viewElement', {
            get() {
              return _this
            }
          })
          if (C.template) {
            this.innerHTML = C.template
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
          if (this.#instanceController.onMount) {
            this.#instanceController.onMount()
          }
        }
        disconnectedCallback(): void {
          if (this.#instanceController.onClose) {
            this.#instanceController.onClose()
          }
        }
      })
    }
  }
}
class ViewController {
  static isController: boolean
  static template: string
  static shadow: boolean
}
Object.defineProperty(ViewController, 'isController', {
  get() {
    return true
  }
})
Object.defineProperty(ViewController, 'template', { value: '', writable: true })
Object.defineProperty(ViewController, 'shadow', { value: true, writable: true })
Object.defineProperty(window, 'ViewController', {
  get() {
    return ViewController
  }
})
new Core()

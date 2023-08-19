import { DriverList, DriverManager } from "../../types/drivers"
import { TaskManager, Task, TaskManagerEvent, TaskManagerEventCallback, TaskManagerEmitterList, RunOptions } from "./../../types/task-manager"
import { LoadViewModule, ViewControllerConstructable, ViewController } from "../../types/view-controller"
import { Emitter } from './drivers/emitter'
import './view-controller'
import './service'
import { AppModule } from "../../types/app"
import { GetService, ServiceConstructable } from "../../types/service"

export class TM implements TaskManager {
  #tasks: Map<string, Task<any>>
  #emitters: TaskManagerEmitterList
  #controllerDeclarations: Map<string, ViewController>
  get tasks(): Task<any>[] {
    const results: Task<any>[] = []
    this.#tasks.forEach(task => results.push(task))
    return results
  }
  constructor(private driverManager: DriverManager) {
    this.#tasks = new Map()
    this.#controllerDeclarations = new Map()
    this.#emitters = {
      new: new Emitter(),
      change: new Emitter(),
      kill: new Emitter()
    }
  }
  #defineView({ tagName, ViewController, getService }: DefineViewOptions) {
    const _ = this
    if (window.customElements.get(tagName) === undefined) {
      window.customElements.define(tagName, class extends HTMLElement {
        #instanceController!: ViewController
        async connectedCallback() {
          let C: any = ViewController
          if (!_.#controllerDeclarations.has(tagName)) {
            if (!C.isController) {
              C = (await C()).default
            }
            _.#controllerDeclarations.set(tagName, C)
          }
          C = _.#controllerDeclarations.get(tagName)
          this.#instanceController = new C()
          const _this = this
          Object.defineProperty(this.#instanceController, 'viewElement', {
            get() {
              return _this
            }
          })
          Object.defineProperty(this.#instanceController, 'containerElement', {
            get() {
              return this.viewElement?.parentElement?.parentElement
            }
          })
          Object.defineProperty(this.#instanceController, 'getService', {
            get() {
              return getService
            }
          })
          if (C.shadow) {
            this.attachShadow({ mode: 'open' })
          }
          if (C.shadowTemplate && this.shadowRoot) {
            this.shadowRoot.innerHTML = C.shadowTemplate
          }
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
  run<T = HTMLElement>({ manifest, module, Container }: RunOptions): Task<T> {
    const PID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16)
    })
    const killTask = () => this.kill(PID)
    const serviceList = new Map<string, ServiceConstructable>()
    const serviceiInstanceList = new Map<string, Service>()
    const getDriver = async (name: keyof DriverList) => {
      if (!manifest.dependences?.includes(name)) {
        throw new Error('No tienes permiso para acceder a este driver.')
      }
      const driver = await this.driverManager.getDriver(name)
      return driver
    }
    const getService: any = async (name: string) => {
      if (!module.Services) {
        throw new Error('No hay dependencias para esta aplicación!')
      }
      if (!serviceiInstanceList.has(name)) {
        if (!serviceList.has(name)) {
          let Service: any = module.Services[name]
          if (!Object.prototype.hasOwnProperty.call(Service, 'isService')) {
            Service = (await Service()).default
          }
          serviceList.set(name, Service)
        }
        const Service = serviceList.get(name) as ServiceConstructable
        Object.defineProperty(Service.prototype, 'getDriver', {
          get() {
            return getDriver
          }
        })
        serviceiInstanceList.set(name, new Service())
      }
      return serviceiInstanceList.get(name)
    }
    const tagName = manifest.packageName.toLowerCase().split('.').join('-')
    const indexTagName = `${module.Views.prefix}-index`
    const defineComponents = async () => {
      this.#defineView({
        tagName: indexTagName,
        ViewController: module.Views.Index,
        getService
      })
      const { others = {} } = module.Views
      const keys: string[] = Object.keys(others)
      for (const key of keys) {
        const ModClass = others[key as any]
        const tag = `${module.Views.prefix}-${key}`
        this.#defineView({
          tagName: tag,
          ViewController: ModClass,
          getService
        })
      }
    }
    if (Container) {
      if (window.customElements.get(tagName) === undefined) {
        window.customElements.define(tagName, class extends Container {
          async connectedCallback() {
            if (super.connectedCallback) {
              await super.connectedCallback()
            }
            defineComponents()
          }
          async disconnectedCallback() {
            if (super.disconnectedCallback) {
              await super.disconnectedCallback()
            }
            killTask()
          }
        })
      }
    } else {
      const styles = new CSSStyleSheet()
      styles.replaceSync(`${tagName} {display: contents;}`)
      const ViewController: ViewControllerConstructable = (window as any).ViewController as any
      this.#defineView({
        tagName: tagName,
        ViewController: class extends ViewController {
          static shadow: boolean = false
          static template: string = `<${indexTagName}></${indexTagName}>`
          static styles: CSSStyleSheet[] = [styles]
          onClose = killTask
          onMount = () => defineComponents()
        },
        getService
      })
    }
    const el = document.createElement(tagName) as T
    const newTask: Task<T> = {
      get PID() {
        return PID
      },
      get icon() {
        return manifest.icon
      },
      get title() {
        return manifest.title
      },
      get description() {
        return manifest.description || 'Sin descripción.'
      },
      get el() {
        return el
      },
      get kill() {
        return killTask
      }
    }
    this.#tasks.set(PID, newTask)
    this.#emitters.new.emmit()
    this.#emitters.change.emmit()
    return newTask
  }
  kill(PID: string): void {
    if (this.#tasks.has(PID)) {
      const task = this.#tasks.get(PID)
      if (task?.el instanceof HTMLElement) {
        task.el.remove()
      }
      this.#tasks.delete(PID)
      this.#emitters.kill?.emmit()
      this.#emitters.change?.emmit()
    }
  }
  on(event: TaskManagerEvent, callback: TaskManagerEventCallback): string {
    return this.#emitters[event]?.on(callback) || ''
  }
  off(event: TaskManagerEvent, uuid: string): void {
    this.#emitters[event]?.off(uuid)
  }
}

type DefineViewOptions = {
  tagName: string
  ViewController: ViewControllerConstructable | LoadViewModule
  getService: GetService
}
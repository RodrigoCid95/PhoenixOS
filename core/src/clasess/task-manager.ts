import { DriverList, DriverManager } from "../../types/drivers"
import { TaskManager, Task, TaskManagerEvent, TaskManagerEventCallback, TaskManagerEmitterList, RunOptions } from "./../../types/task-manager"
import { LoadViewModule, ViewControllerConstructable, ViewController } from "../../types/view-controller"
import { Emitter } from './drivers/emitter'
import './view-controller'
import './service'
import { ServiceConstructable, Service } from "../../types/service"

export class TM implements TaskManager {
  #tasks: Map<string, Task<any>>
  #emitters: TaskManagerEmitterList
  #controllerDeclarations: Map<string, ViewControllerConstructable>
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
  run<T = HTMLElement>({ manifest, module, Container, system }: RunOptions): Task<T> {
    const _ = this
    const PID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16)
    })
    const serviceList = new Map<string, ServiceConstructable>()
    const serviceiInstanceList = new Map<string, Service>()
    const getDriver = async (name: keyof DriverList) => {
      if (!manifest.dependences?.includes(name)) {
        throw new Error('No tienes permiso para acceder a este driver.')
      }
      const driver = await _.driverManager.getDriver(name)
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
        Object.defineProperty(Service.prototype, 'getDriver', { value: getDriver, writable: false })
        serviceiInstanceList.set(name, new Service())
      }
      return serviceiInstanceList.get(name)
    }
    const defineView = ({ tagName, ViewController }: DefineViewOptions) => {
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
            if (!Object.prototype.hasOwnProperty.call(C, 'instancesCount')) {
              Object.defineProperty(C, 'instancesCount', { value: 0, writable: true })
            }
            C.instancesCount++
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
            Object.defineProperty(this.#instanceController, 'getService', { value: getService, writable: false })
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
          async disconnectedCallback() {
            if (this.#instanceController.onClose) {
              await this.#instanceController.onClose()
            }
            (_.#controllerDeclarations.get(tagName) as any).instancesCount--
          }
        })
      }
    }
    const tagName = manifest.packageName.toLowerCase().split('.').join('-')
    const indexTagName = `${module.Views.prefix}-index`
    const defineComponents = async () => {
      defineView({
        tagName: indexTagName,
        ViewController: module.Views.Index
      })
      const { others = {} } = module.Views
      const keys: string[] = Object.keys(others)
      for (const key of keys) {
        const ModClass = others[key as any]
        const tag = `${module.Views.prefix}-${key}`
        defineView({
          tagName: tag,
          ViewController: ModClass
        })
      }
    }
    const sanitizeServices = async (counter: number) => {
      if (counter === 0) {
        const iterator = serviceiInstanceList.values()
        for (const item of iterator) {
          await item?.onKill()
        }
        serviceiInstanceList.clear()
      }
    }
    if (Container) {
      if (window.customElements.get(tagName) === undefined) {
        window.customElements.define(tagName, class CustomContainer extends Container {
          static instancesCount: number = 0
          async connectedCallback() {
            CustomContainer.instancesCount++
            if (super.connectedCallback) {
              await super.connectedCallback()
            }
            defineComponents()
          }
          async disconnectedCallback() {
            CustomContainer.instancesCount--
            _.#kill((this as any).PID)
            sanitizeServices(CustomContainer.instancesCount)
            if (super.disconnectedCallback) {
              await super.disconnectedCallback()
            }
          }
        })
      }
    } else {
      const styles = new CSSStyleSheet()
      styles.replaceSync(`${tagName} {display: contents;}`)
      const ViewController: ViewControllerConstructable = (window as any).ViewController as any
      defineView({
        tagName: tagName,
        ViewController: class GenericContainer extends ViewController {
          static shadow: boolean = false
          static template: string = `<${indexTagName}></${indexTagName}>`
          static styles: CSSStyleSheet[] = [styles]
          onMount = defineComponents
          onClose = () => {
            _.#kill((this.viewElement as any).PID)
            sanitizeServices(GenericContainer.instancesCount)
          }
        }
      })
    }
    const el = document.createElement(tagName) as HTMLElement
    Object.defineProperty(el, 'PID', { value: PID, writable: false })
    const newTask: any = {}
    Object.defineProperty(newTask, 'PID', { value: PID, writable: false })
    Object.defineProperty(newTask, 'icon', { value: manifest.icon, writable: false })
    Object.defineProperty(newTask, 'title', { value: manifest.title, writable: false })
    Object.defineProperty(newTask, 'description', { value: manifest.description || 'Sin descripción.', writable: false })
    Object.defineProperty(newTask, 'el', { value: el, writable: false })
    Object.defineProperty(newTask, 'kill', { value: () => el.remove(), writable: false })
    Object.defineProperty(newTask, 'system', { value: system, writable: false })
    this.#tasks.set(PID, newTask)
    this.#emitters.new.emmit()
    this.#emitters.change.emmit()
    return newTask
  }
  #kill(PID: string) {
    if (this.#tasks.has(PID)) {
      this.#tasks.delete(PID)
      this.#emitters.kill?.emmit()
      this.#emitters.change?.emmit()
    }
  }
  kill(PID: string): void {
    if (this.#tasks.has(PID)) {
      const task = this.#tasks.get(PID)
      if (task?.el.isConnected) {
        task.el.remove()
      }
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
}
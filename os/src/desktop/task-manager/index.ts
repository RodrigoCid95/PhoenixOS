import { TaskManager } from 'phoenix-core/types/task-manager'
import template from './template.html'

export default class TaskManagerController extends window.ViewController {
  static template: string = template
  taskManager!: TaskManager
  #listElement!: HTMLIonListElement
  async onMount() {
    this.#listElement = this.viewElement.querySelector('ion-list') as HTMLIonListElement
    document.getElementById('play')?.addEventListener('contextmenu', e => {
      e.preventDefault()
      document.querySelector<HTMLIonMenuElement>('[content-id="play"]')?.open()
    })
    this.#generateAppList()
    this.taskManager.on('change', this.#generateAppList.bind(this))
  }
  #generateAppList() {
    const { tasks } = this.taskManager
    this.#listElement.innerHTML = ''
    if (tasks.length > 0) {
      for (const task of tasks) {
        const item = document.createElement('ion-item')
        item.setAttribute('button', '')
        item.addEventListener('contextmenu', e => {
          e.preventDefault()
          if (!task.system) {
            task.kill()
          }
        })
        if (task.system) {
          item.setAttribute('color', 'medium')
        } else {
          if (Object.prototype.hasOwnProperty.call(task.el, 'isWindowContainer')) {
            item.onclick = async () => {
              await window.menuController.close('task-manager')
              if (task.el.minimize) {
                task.el.minimize = false
              }
              if (!task.el.isFocus) {
                task.el.focus()
              }
            }
          }
        }
        if (task.icon) {
          const thumbnail = document.createElement('ion-thumbnail')
          thumbnail.setAttribute('slot', 'start')
          thumbnail.innerHTML = `<img alt="${task.title}" src="${task.icon}" />`
          item.append(thumbnail)
        }
        const label = document.createElement('ion-label')
        label.innerHTML = `<h3>${task.title}</h3><p>${task.description}</p>`
        item.append(label)
        this.#listElement.append(item)
      }
    } else {
      const emptyItem = document.createElement('ion-item')
      emptyItem.innerHTML = '<ion-label>Sin apps abiertas.</ion-label>'
      this.#listElement.append(emptyItem)
    }
  }
}
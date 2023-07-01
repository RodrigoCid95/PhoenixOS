import { ICore, IEmitters, IManifest, ITask, IWindow, WindowComponent } from "phoenix-builder"
import _styles from './style.scss'
import _template from './template.html'
import LauncherController from "./launcher"

export default class AppDesktopController extends window.ViewController {
	static template = _template
	static styles: CSSStyleSheet[] = [_styles]
	static shadow: boolean = false
	launch!: (manifest: IManifest) => Promise<void>
	defineComponent!: ICore['defineWebComponent']
	viewElement!: HTMLElement
	#appList: IWindow[] = []
	emitters!: IEmitters
	#orderIndexes(start: number) {
		for (const app of this.#appList) {
			let zIndex = parseInt(app.style.zIndex)
			if (zIndex > start) {
				zIndex--
				app.tabIndex = zIndex
				app.style.zIndex = zIndex.toString()
			}
		}
	}
	async onMount() {
		Object.defineProperty(LauncherController.prototype, 'emitters', { value: this.emitters, writable: false })
		Object.defineProperty(LauncherController.prototype, 'launch', { value: this.launch, writable: false })
		Object.defineProperty(LauncherController.prototype, 'defineComponent', { value: this.defineComponent, writable: false })
		this.defineComponent({
			tagName: 'desktop-launcher',
			Controller: LauncherController
		})
		this.emitters.on('add-app', (task: ITask<WindowComponent>) => {
			const element = task.el
			element.tabIndex = this.#appList.length
			element.style.zIndex = element.tabIndex.toString()
			const btnTask = document.createElement('ion-chip')
			btnTask.innerHTML = `${task.icon ? `<ion-avatar><img alt="${task.title}" src="${task.icon}" /></ion-avatar>` : '<ion-icon name="browsers-outline"></ion-icon>'}<ion-label>${task.title}</ion-label>`
			element.addEventListener('onClose', () => {
				btnTask.remove()
				this.#orderIndexes((element.tabIndex + 1))
			})
			element.addEventListener('focus', () => {
				btnTask.setAttribute('color', 'primary')
				let appIndex = parseInt(element.style.zIndex)
				const apps = this.#appList
				if (apps.length > 1 && appIndex < apps.length) {
					this.#orderIndexes(appIndex);
					element.tabIndex = apps.length;
					element.style.zIndex = apps.length.toString()
				}
			})
			element.addEventListener('blur', () => btnTask.removeAttribute('color'))
			btnTask.addEventListener('click', () => {
				if (element.minimize) {
					element.minimize = false;
					element.focus()
				} else {
					const zIndex = parseInt(element.style.zIndex)
					if (zIndex === this.#appList.length) {
						element.minimize = true
					} else {
						element.focus()
					}
				}
			})
			this.viewElement.querySelector('.tasks')?.append(btnTask)
			this.#appList.push(element)
			this.viewElement.querySelector('.desktop')!.append(element)
			this.viewElement.querySelector<any>('ion-modal')!.dismiss()
		})
	}
}
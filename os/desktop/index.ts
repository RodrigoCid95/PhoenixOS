import { IEmitters, IManifest, ITask, IWindow, WindowComponent } from "phoenix-builder"
import _styles from './style.scss'
import _template from './template.html'

export default class AppDesktopController extends window.ViewController {
	static template = _template
	static styles: CSSStyleSheet[] = [_styles]
	static shadow: boolean = false
	viewElement!: HTMLElement
	#modalRef!: HTMLIonModalElement
	#btnStartRef!: HTMLIonButtonElement
	#desktopRef!: HTMLDivElement
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
		this.#modalRef = this.viewElement.querySelector('#launcher') as any
		this.#modalRef.querySelector('ion-header ion-toolbar ion-buttons ion-button')?.addEventListener('click', () => this.#modalRef.dismiss())
		this.#btnStartRef = this.viewElement.querySelector('#play') as any
		this.#btnStartRef.addEventListener('click', () => this.#modalRef.present())
		this.#desktopRef = this.viewElement.querySelector('.desktop') as any
		const loading = await window.loadingController.create({ message: 'Cargando...' })
		loading.present()
		const appList: IManifest[] = await fetch('/apps').then(res => res.json())
		const listRef = this.#modalRef.querySelector('ion-content ion-list')
		for (const manifest of appList) {
			const ionItem = document.createElement('ion-item')
			ionItem.addEventListener('click', () => {
				this.emitters.emmit('launch', manifest)
				this.#modalRef.dismiss()
			})
			ionItem.style.cursor = 'pointer'
			const ionThumbnail = document.createElement('ion-thumbnail')
			ionThumbnail.slot = 'start'
			ionThumbnail.innerHTML = `<img alt="${manifest.packageName}" src="${manifest.icon}" />`
			ionItem.append(ionThumbnail)
			const ionLabel = document.createElement('ion-label')
			ionLabel.innerHTML = `${manifest.title}<p>${manifest.description}</p>`
			ionItem.append(ionLabel)
			listRef?.append(ionItem)
		}
		loading.dismiss()
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
			this.#desktopRef.append(element)
		})
	}
}
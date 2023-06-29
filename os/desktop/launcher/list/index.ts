import { IManifest } from 'phoenix-builder'
import template from './template.html'


export default class LauncherListController extends window.ViewController {
  static template: string = template
  launch!: (manifest: IManifest) => Promise<void>
  async onMount() {
    const appList: IManifest[] = await fetch('/apps').then(res => res.json())
    const listRef = this.viewElement.querySelector('ion-list')
    for (const manifest of appList) {
      const ionItem = document.createElement('ion-item')
      ionItem.addEventListener('click', () => this.launch(manifest))
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
    this.viewElement.querySelector('ion-progress-bar')?.remove()
  }
}
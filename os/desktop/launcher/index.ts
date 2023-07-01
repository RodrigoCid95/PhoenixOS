import { ICore, IEmitters, IManifest } from 'phoenix-builder'
import template from './template.html'
import LauncherListController from './list'

export default class LauncherController extends window.ViewController {
  static template = template
  static tag = ''
  defineComponent!: ICore['defineWebComponent']
  emitters!: IEmitters
  launch!: (manifest: IManifest) => Promise<void>
  async onMount() {
    Object.defineProperty(LauncherListController.prototype, 'emitters', { value: this.emitters, writable: false })
    Object.defineProperty(LauncherListController.prototype, 'launch', { value: this.launch, writable: false })
    this.defineComponent({
      tagName: 'desktop-launcher-list',
      Controller: LauncherListController
    })
    this.defineComponent({
      tagName: 'desktop-launcher-settings',
      Controller: async () => {
        const { default: LauncherSettingsController } = await import('./settings')
        if (!Object.getOwnPropertyNames(LauncherSettingsController.prototype).includes('emitters')) {
          Object.defineProperty(LauncherSettingsController.prototype, 'emitters', { value: this.emitters, writable: false })
        }
        return { default: LauncherSettingsController }
      }
    })
    const modalRef = this.viewElement.querySelector<any>('ion-modal')
    modalRef.backdropDismiss = false
    modalRef.breakpoints = [0, .5, .75, 1]
    modalRef.addEventListener('ionModalWillPresent', () => {
      modalRef.innerHTML = '<ion-nav root="desktop-launcher-list"></ion-nav>'
      this.emitters.emmit('onOpenPlay')
    })
  }
}
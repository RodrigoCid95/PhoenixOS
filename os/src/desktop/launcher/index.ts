import template from './template.html'
import { EmittersDriver } from 'phoenix-core/types/drivers/emitter'

export default class LauncherController extends window.ViewController {
  static template = template
  static tag = ''
  emitters!: EmittersDriver
  async onMount() {
    const modalRef = this.viewElement.querySelector<any>('ion-modal')
    modalRef.backdropDismiss = false
    modalRef.breakpoints = [0, .5, .75, 1]
    modalRef.addEventListener('ionModalWillPresent', () => {
      modalRef.innerHTML = '<ion-nav root="desktop-launcher-list"></ion-nav>'
      this.emitters.emmit('onOpenPlay')
    })
  }
}
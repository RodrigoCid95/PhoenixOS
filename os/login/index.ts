import _template from './template.html'

export default class AppLoginController extends window.ViewController {
  static template = _template
  onMount() {
    this.viewElement.querySelector<any>('ion-modal').backdropDismiss = false
    this.viewElement.querySelector('#enter')?.addEventListener('click', () => {
      this.viewElement.dispatchEvent(new CustomEvent('onAuth'))
    })
  }
}
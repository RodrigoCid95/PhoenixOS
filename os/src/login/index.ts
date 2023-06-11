import _template from './template.html'

export default class AppLoginController extends window.Controller {
  static innerTemplate = _template
  element!: HTMLElement
  onMount() {
    this.element.querySelector('#enter')?.addEventListener('click', () => {
      this.element.dispatchEvent(new CustomEvent('onAuth'))
    })
  }
}
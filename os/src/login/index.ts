import { IController } from "phoenix-builder"
import _template from './template.html'

export default class AppLoginController implements IController {
  static innerTemplate = _template
  element!: HTMLElement
  constructor() { }
  onMount() {
    this.element.querySelector('#enter')?.addEventListener('click', () => {
      this.element.dispatchEvent(new CustomEvent('onAuth'))
    })
  }
}
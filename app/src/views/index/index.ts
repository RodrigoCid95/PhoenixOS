import template from './template.html'

export default class AppOne extends window.ViewController {
  static template = template
  onMount() {
    this.viewElement.querySelector('[name="minimize"]')?.addEventListener('click', () => this.containerElement.minimize = true)
    this.viewElement.querySelector('[name="close"]')?.addEventListener('click', () => this.containerElement.close())
  }
  onClose() {
    console.log('onClose', this)
  }
}
import template from './template.html'

export default class AppOne extends window.ViewController {
  static template = template
  onMount() {
    console.log(this.viewElement)
    console.log(this.windowElement)
    this.viewElement.querySelector('[name="minimize"]')?.addEventListener('click', () => this.windowElement.minimize = true)
    this.viewElement.querySelector('[name="close"]')?.addEventListener('click', () => this.windowElement.remove())
  }
}
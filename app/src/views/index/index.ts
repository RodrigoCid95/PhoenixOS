import { WindowComponent } from 'phoenix-builder'
import template from './template.html'

export default class AppOne extends window.IndexController {
  static shadow = true
  static innerTemplate = template
  static shadowTemplate = '<slot></slot>'
  static tag: string = 'at-one'
  element!: WindowComponent
  constructor(...args: string[]) {
    super()
    console.log(this, args)
  }
  onMount() {
    const parent = (this.element as any).parentElement.parentElement as unknown as WindowComponent
    this.element.querySelector('[name="minimize"]')?.addEventListener('click', () => parent.minimize = true)
    this.element.querySelector('[name="close"]')?.addEventListener('click', () => parent.remove())
  }
  onClose(): void | Promise<void> {
    
  }
}
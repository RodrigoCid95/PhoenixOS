import { WindowComponent } from 'phoenix-builder'
import template from './template.html'

export default class AppPageThree extends window.ViewController {
  static innerTemplate = template
  element!: WindowComponent
  constructor(...args: string[]) {
    super()
    console.log(this, args)
  }
}
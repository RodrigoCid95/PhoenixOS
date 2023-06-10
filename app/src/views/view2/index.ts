import { IController, WindowComponent } from 'phoenix-builder'
import template from './template.html'

export default class AppOne implements IController {
  static template = template
  element!: WindowComponent
  constructor(...args: string[]) {
    console.log(this, args)
  }
}
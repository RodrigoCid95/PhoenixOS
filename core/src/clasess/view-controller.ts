export class ViewController {
  static isController: boolean
  static template: string
  static shadow: boolean
}

Object.defineProperty(ViewController, 'isController', { value: true, writable: false })
Object.defineProperty(ViewController, 'template', { value: '', writable: true })
Object.defineProperty(ViewController, 'shadow', { value: false, writable: true })
Object.defineProperty(window, 'ViewController', { value: ViewController, writable: false })
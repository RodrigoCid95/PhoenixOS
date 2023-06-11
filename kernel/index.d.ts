import { ViewControllerClass } from 'phoenix-builder'

declare global {
  interface Window {
    ViewController: ViewControllerClass
  }
}
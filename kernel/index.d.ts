import { ControllerClass, IndexControllerClass } from 'phoenix-builder'

declare global {
  interface Window {
    IndexController: IndexControllerClass
    Controller: ControllerClass
  }
}
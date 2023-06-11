import { ITaskManager } from './task-manager'
import { IDriverManager } from './drivers'
import { WindowComponent } from '../os'

export interface IService {
  onKill(): void | Promise<void>
}
export interface ServiceClass {
  new(): IService
}
export type GetService = <S = IService>(serviceNAme: string) => S
export declare class ViewControllerClass {
  static styles: CSSStyleSheet[]
  static template: string
  static shadow: boolean
  readonly viewElement: HTMLElement
  readonly windowElement: WindowComponent
  getService: GetService
  onMount(): void | Promise<void>
  onClose(): void | Promise<void>
}
export interface ViewControllerConstructable {
  new(): ViewControllerClass
}
export interface IDriver<T> {
  new(kernel: IKernel): T
}
export type DefineWebComponentOptions = {
  tagName: string
  Controller: ControllerClassConstructable | IndexControllerClassConstructable | LoadView
  prepareInstace?: (definition: ViewControllerClass) => ViewControllerClass
  shadowTemplate?: string
}
export interface IKernel {
  readonly TaskManager: ITaskManager
  readonly DriverManager: IDriverManager
  defineWebComponent(options: DefineWebComponentOptions): void
}
export type ViewModule = { default: ViewControllerConstructable }
export type LoadViewModule = () => Promise<ViewModule>
export type ServiceModule = { default: ServiceClass }
export type LoadServiceModule = () => Promise<ServiceModule>
export type OtherViews = {
  [x: Lowercase<string>]: ViewControllerConstructable | LoadViewModule
}
export type ControllerList = {
  Index: ViewControllerConstructable
  others?: OtherViews
}
export type ServiceList = { [x: string]: ServiceClass | LoadService }
export type AppModule = {
  prefix: Lowercase<string>
  Views: ControllerList
  Services?: ServiceList
}

export * from './drivers'
export * from './task-manager'
export * from './window'
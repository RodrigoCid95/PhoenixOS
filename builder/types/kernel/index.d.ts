import { ITaskManager } from './task-manager'
import { IDriverManager, IDriverList } from './drivers'
import { WindowComponent } from '../os'

export declare class ServiceClass {
  getDriver<K extends keyof IDriverList>(name: K): Promise<IDriverList[K]>
  onKill(): void | Promise<void>
}
export interface ServiceConstructable {
  new(): ServiceClass
}
export type GetService = <S = ServiceClass>(serviceNAme: string) => Promise<S>
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
export type LoadView = LoadViewModule
export type DefineWebComponentOptions = {
  tagName: string
  Controller: ViewControllerConstructable | LoadView
  prepareControllerClass?: (definition: ViewControllerConstructable) => ViewControllerConstructable
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
export type ServiceModule = { default: ServiceConstructable }
export type LoadServiceModule = () => Promise<ServiceModule>
export type OtherViews = {
  [x: Lowercase<string>]: ViewControllerConstructable | LoadViewModule
}
export type ControllerList = {
  Index: ViewControllerConstructable
  others?: OtherViews
}
export type ServiceList = { [x: string]: ServiceConstructable | LoadService }
export type AppModule = {
  prefix: Lowercase<string>
  Views: ControllerList
  Services?: ServiceList
}

export * from './drivers'
export * from './task-manager'
export * from './window'
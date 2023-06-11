import { ITaskManager } from './task-manager'
import { IDriverManager } from './drivers'

export interface IService {
  onKill(): void | Promise<void>
}
export interface ServiceClass {
  new(): IService
}
export type GetService = <S = IService>(serviceNAme: string) => S
export declare class ControllerClass<E = HTMLElement> {
  static styles: CSSStyleSheet[]
  static shadow: boolean
  static innerTemplate: string
  static shadowTemplate: string
  element?: E
  getService: GetService
  onMount(): void | Promise<void>
  onClose(): void | Promise<void>
}
export declare class IndexControllerClass extends ControllerClass {
  static tag: string
}
export interface ControllerClassConstructable {
  static styles: CSSStyleSheet[]
  static shadow: boolean
  static innerTemplate: string
  static shadowTemplate: string
  new(...args: string[]): ControllerClass
}
export interface IndexControllerClassConstructable {
  static styles: CSSStyleSheet[]
  static shadow: boolean
  static innerTemplate: string
  static shadowTemplate: string
  static tag: string
  new(...args: string[]): ControllerClass
}
export interface IDriver<T> {
  new(kernel: IKernel): T
}
export type DefineWebComponentOptions = {
  tagName: string
  Controller: ControllerClassConstructable | IndexControllerClassConstructable | LoadView
  getService: GetService
  args?: string[]
}
export interface IKernel {
  readonly TaskManager: ITaskManager
  readonly DriverManager: IDriverManager
  defineWebComponent(options: DefineWebComponentOptions): void
}
export type ViewModule = { default: ControllerClassConstructable }
export type LoadView = () => Promise<ViewModule>
export type ServiceModule = { default: ServiceClass }
export type LoadService = () => Promise<ServiceModule>
export type OtherViews<P = string> = {
  [x: `${Lowercase<P>}-${Lowercase<string>}` | `${Lowercase<P>}-${Lowercase<string>}-${Lowercase<string>}`]: ControllerClassConstructable | LoadView
}
export type ControllerList<P = string> = {
  Index: IndexControllerClassConstructable
  others?: OtherViews<P>
}
export type ServiceList = { [x: string]: ServiceClass | LoadService }
export type AppModule<P = string> = {
  Views: ControllerList<P>
  Services?: ServiceList
}

export * from './drivers'
export * from './task-manager'
export * from './window'
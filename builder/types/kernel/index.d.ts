import { ITaskManager } from './task-manager'
import { IDriverManager } from './drivers'

export interface IService {
  onKill(): void | Promise<void>
}
export interface ServiceClass {
  new(): IService
}
export type GetService = <S = IService>(serviceNAme: string) => S
export interface IController<E = HTMLElement> {
  static styles?: CSSStyleSheet[]
  static shadow?: boolean
  static innerTemplate?: string
  static shadowTemplate?: string
  element?: E
  getService?: GetService
  onMount?: () => void | Promise<void>
  onClose?: () => void | Promise<void>
}
export declare interface ControllerClass {
  styles?: CSSStyleSheet[]
  shadow?: boolean
  shadowTemplate?: string
  innerTemplate?: string
  new(...args: string[]): IController
}
export declare interface IndexControllerClass {
  styles?: CSSStyleSheet[]
  shadow?: boolean
  shadowTemplate?: string
  innerTemplate?: string
  tag: string
  new(...args: string[]): IController
}
export interface IDriver<T> {
  new(kernel: IKernel): T
}
export type DefineWebComponentOptions = {
  tagName: string
  Controller: ControllerClass | LoadView
  getService: GetService
  args?: string[]
}
export interface IKernel {
  readonly TaskManager: ITaskManager
  readonly DriverManager: IDriverManager
  defineWebComponent(options: DefineWebComponentOptions): void
}
export type ViewModule = { default: ControllerClass }
export type LoadView = () => Promise<ViewModule>
export type ServiceModule = { default: ServiceClass }
export type LoadService = () => Promise<ServiceModule>
export type OtherViews<P = string> = {
  [x: `${Lowercase<P>}-${Lowercase<string>}` | `${Lowercase<P>}-${Lowercase<string>}-${Lowercase<string>}`]: ControllerClass | LoadView
}
export type ControllerList<P = string> = {
  Index: IndexControllerClass
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
import { EmitterDriver } from './drivers/emitter'
import { AppModule } from './app'
import { ViewControllerConstructable } from './view-controller'

export interface Task<T = HTMLElement> {
  readonly PID: string
  readonly icon?: string
  readonly title: string
  readonly description: string
  readonly el: T
  readonly kill(): void | Promise<void>
  readonly system: boolean
}
export interface TaskConstructable<T> {
  new(): Task<T>
}
export type TaskManagerEvent = 'new' | 'kill' | 'change'
export type TaskManagerEmitterList = {
	[k in TaskManagerEvent]: EmitterDriver
}
export type TaskManagerEventCallback = () => void
export interface Manifest {
  packageName: string
  title: string
  description?: string
  author?: string[]
  icon?: string
  dependences?: Array<keyof DriverList>
}
export interface ContainerElement extends HTMLElement {
  connectedCallback?(): void | Promise<void>
  disconnectedCallback?(): void | Promise<void>
}
export interface ContainerConstructor {
  new (...params: any[]): ContainerElement
}
export interface RunOptions {
  manifest: Manifest
  module: AppModule
  Container?: ContainerConstructor
  system: boolean
}
export type DefineWebComponentOptions = {
  tagName: string
  Controller: ViewControllerConstructable | LoadView
  prepareControllerClass?: (definition: ViewControllerConstructable) => ViewControllerConstructable
  prepareInstace?: (instance: ViewController) => ViewController
  shadowTemplate?: string
}
export interface TaskManager {
  run<T>(options: RunOptions): Task<T>
  readonly tasks: Task<any>[]
  kill(PID: string): void
  on(event: TaskManagerEvent, callback: TaskManagerEventCallback): string
  off(event: TaskManagerEvent, uuid: string): void
}
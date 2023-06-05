import { ITaskManager } from './task-manager'
import { IDriverManager } from './drivers'

export interface IDriver<T> {
  new(kernel: IKernel): T
}
export interface IKernel {
  readonly TaskManager: ITaskManager
  readonly DriverManager: IDriverManager
}

export * from './drivers'
export * from './task-manager'
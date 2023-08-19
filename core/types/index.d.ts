import { TaskManager } from './task-manager'
import { DriverManager, DriverList } from './drivers'
import { ViewControllerConstructable, LoadView, ViewController } from './view-controller'
import { AppModule } from './app'

export interface Core {
  readonly TaskManager: TaskManager
  readonly DriverManager: DriverManager
}
export interface CoreConstructable {
  new(): Core
}
export class Kernel implements Core {
  readonly TaskManager: TaskManager
  readonly DriverManager: DriverManager
}
import { Core } from './../types'
import { TaskManager } from './../types/task-manager'
import { DriverManager } from './../types/drivers'
import { TM } from './clasess/task-manager'
import { Drivers } from './clasess/drivers'

export class Kernel implements Core {
  #DriverManager: DriverManager = new Drivers()
  #TaskManager: TaskManager = new TM(this.#DriverManager)
  get TaskManager(): TaskManager {
    return this.#TaskManager
  }
  get DriverManager(): DriverManager {
    return this.#DriverManager
  }
}
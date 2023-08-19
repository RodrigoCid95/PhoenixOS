import { ControllerList } from './view-controller'
import { ServiceList } from './service'

export type AppModule = {
  Views: ControllerList
  Services?: ServiceList
}
import { ICipher } from "./cipher"
import { IEmitters } from "./emitter"
import { IGeolocation } from './geolocation'
import { ILocalNotifications } from './notifications'
import { IPermissions } from "./permissions"
import { IServerConnector } from "./server"

export interface IDriverList {
  cipher: ICipher
  emitters: IEmitters
  geolocation: IGeolocation
  localNotifications: ILocalNotifications
  permissions: IPermissions
  server: IServerConnector
}
export interface IDriverManager {
  getDriver<K extends keyof IDriverList>(name: K): Promise<IDriverList[K]>
}

export * from './cipher'
export * from './emitter'
export * from './geolocation'
export * from './notifications'
export * from './permissions'
export * from './server'
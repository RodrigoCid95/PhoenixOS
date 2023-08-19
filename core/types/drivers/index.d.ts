import { CipherDriver } from './cipher'
import { EmittersConstructable } from './emitter'
import { GeolocationDriver } from './geolocation'
import { LocalNotificationsDriver } from './notifications'
import { PermissionsDriver } from './permissions'
import { ServerConnector } from './server'

export interface DriverList {
  cipher: CipherDriver
  emitters: EmittersConstructable
  geolocation: GeolocationDriver
  localNotifications: LocalNotificationsDriver
  permissions: PermissionsDriver
  server: ServerConnector
}
export interface DriverManager {
  getDriver<K extends keyof DriverList>(name: K): Promise<DriverList[K]>
}
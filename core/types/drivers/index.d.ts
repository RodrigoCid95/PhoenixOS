import { CipherDriver } from './cipher'
import { EmittersConstructable } from './emitter'
import { GeolocationDriver } from './geolocation'
import { LocalNotificationsDriver } from './notifications'
import { Permissions } from './permissions'
import { APIConnectorConstructable } from './api-connector'

export interface DriverList {
  cipher: CipherDriver
  emitters: EmittersConstructable
  geolocation: GeolocationDriver
  localNotifications: LocalNotificationsDriver
  permissions: Permissions
  'api-connector': APIConnectorConstructable
}
export interface DriverManager {
  getDriver<K extends keyof DriverList>(name: K): Promise<DriverList[K]>
}
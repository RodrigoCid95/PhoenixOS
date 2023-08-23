import { DriverList, DriverManager } from './../../../types/drivers'

type Imports = {
  [x in keyof DriverList]: () => Promise<any>
}
export class Drivers implements DriverManager {
  #drivers: Map<keyof DriverList, any> = new Map()
  #imports: Imports = {
    cipher: async () => {
      if (!this.#drivers.has('cipher')) {
        const { Cipher } = await import('./cipher')
        this.#drivers.set('cipher', new Cipher())
      }
      return this.#drivers.get('cipher')
    },
    emitters: async () => {
      if (!this.#drivers.has('emitters')) {
        const { Emitters } = await import('./emitter')
        this.#drivers.set('emitters', Emitters)
      }
      return this.#drivers.get('emitters')
    },
    geolocation: async () => {
      if (!this.#drivers.has('geolocation')) {
        const { Geolocation } = await import('./geolocation')
        this.#drivers.set('geolocation', new Geolocation(await this.getDriver('permissions') as any))
      }
      return this.#drivers.get('geolocation')
    },
    localNotifications: async () => {
      if (!this.#drivers.has('localNotifications')) {
        const { LocalNotifications } = await import('./notifications')
        const lnDriver = await this.getDriver('permissions')
        const eDriver = await this.getDriver('emitters')
        const emitters = new eDriver()
        this.#drivers.set('localNotifications', new LocalNotifications(lnDriver, emitters))
      }
      return this.#drivers.get('localNotifications')
    },
    permissions: async () => {
      if (!this.#drivers.has('permissions')) {
        const { PermissionsDriver } = await import('./permissions')
        this.#drivers.set('permissions', new PermissionsDriver())
      }
      return this.#drivers.get('permissions')
    },
    'api-connector': async () => {
      if (!this.#drivers.has('api-connector')) {
        const { APIConnectorDriver } = await import('./api-connector')
        this.#drivers.set('api-connector', APIConnectorDriver)
      }
      return this.#drivers.get('api-connector')
    }
  }
  async getDriver<K extends keyof DriverList>(name: K): Promise<DriverList[K]> {
    return await this.#imports[name]()
  }
}
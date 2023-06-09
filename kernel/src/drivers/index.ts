import { IDriverList, IDriverManager } from "phoenix-builder"

type Imports = {
  [x in keyof IDriverList]: () => Promise<any>
}
export class DriverManager implements IDriverManager {
  #drivers: Map<keyof IDriverList, any> = new Map()
  #imports: Imports = {
    cipher: async () => {
      if (!this.#drivers.has('cipher')) {
        const { Cipher } = await import('./cipher')
        this.#drivers.set('cipher', new Cipher())
      }
    },
    emitters: async () => {
      if (!this.#drivers.has('emitters')) {
        const { Emitters } = await import('./emitter')
        this.#drivers.set('emitters', new Emitters())
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
        this.#drivers.set('localNotifications', new LocalNotifications(lnDriver, eDriver))
      }
      return this.#drivers.get('localNotifications')
    },
    permissions: async () => {
      if (!this.#drivers.has('permissions')) {
        const { Permissions } = await import('./permissions')
        this.#drivers.set('permissions', new Permissions())
      }
      return this.#drivers.get('permissions')
    },
    server: async () => {
      if (!this.#drivers.has('server')) {
        const { Server } = await import('./server')
        const cipher = await this.getDriver('cipher')
        const emitters = await this.getDriver('emitters')
        this.#drivers.set('server', new Server(emitters, cipher))
      }
      return this.#drivers.get('server')
    }
  }
  async getDriver<K extends keyof IDriverList>(name: K): Promise<IDriverList[K]> {
    return await this.#imports[name]()
  }
}
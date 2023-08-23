import { WatchPositionOptions, GeolocationDriver } from './../../../types/drivers/geolocation'
import { Permissions } from './../../../types/drivers/permissions'

export class Geolocation implements GeolocationDriver {
  constructor(private permissions: Permissions) { }
  async #checkPermission() {
    const PERMISSION = await this.permissions.query('geolocation')
    if (PERMISSION === 'denied') {
      throw {
        code: 'permission-denied',
        message: 'No tienes permiso para usar la ubicación!'
      }
    }
  }
  async clearWatch(watchId: number): Promise<void> {
    await this.#checkPermission()
    navigator.geolocation.clearWatch(watchId)
  }
  async getCurrentPosition(options?: PositionOptions | undefined): Promise<GeolocationPosition> {
    await this.#checkPermission()
    return new Promise<GeolocationPosition>((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, options))
  }
  async watchPosition({ onChange, onError, options }: WatchPositionOptions): Promise<number> {
    await this.#checkPermission()
    return navigator.geolocation.watchPosition(onChange, onError, options)
  }
}
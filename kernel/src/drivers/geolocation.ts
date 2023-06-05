import { WatchPositionOptions, IGeolocation, IPermissions } from 'phoenix-builder'

export class Geolocation implements IGeolocation {
  constructor(private permissions: IPermissions) { }
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
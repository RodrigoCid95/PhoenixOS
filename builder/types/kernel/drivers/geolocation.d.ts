export type WatchPositionOptions = {
  onChange: PositionCallback
  onError?: PositionErrorCallback
  options?: PositionOptions
}
export interface IGeolocation {
  clearWatch(watchId: number): Promise<void>
  getCurrentPosition(options?: PositionOptions): Promise<GeolocationPosition>
  watchPosition(options: WatchPositionOptions): Promise<number>
}
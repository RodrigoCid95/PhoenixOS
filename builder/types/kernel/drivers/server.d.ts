export interface IMethods {
  GET: 'GET'
  POST: 'POST'
  PUT: 'PUT'
  DELETE: 'DELETE'
}
export type SendArguments = {
  path: string
  method: IMethods[keyof IMethods]
  data?: any
  encryptRequest?: boolean
  decryptResponse?: boolean
}
export type Callback<T> = (response: T) => void | Promise<void>
export interface IServerConnector {
  connect(url: string): void
  disconnect(): void
  onConnect(callback: () => void | Promise<void>): string
  onDisconnect(callback: () => void | Promise<void>): string
  on(event: 'connect' | 'disconnect', callback: Callback<void>): Promise<string>
  on<T = {}>(event: string, callback: Callback<T>): Promise<void>
  off(event: 'connect' | 'disconnect', uuid: string): void
  off(event: string, listener: any): void
  send<T = void>(args: SendArguments): Promise<T>
  emit<T = void>(event: string, data?: object): Promise<T>
}
export type Response<T> = {
  data: T
  error: {
    message: string
    stack: string
  }
}
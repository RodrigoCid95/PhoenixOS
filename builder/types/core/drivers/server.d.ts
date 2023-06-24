import { ICipher } from "./cipher"

export type SendArguments = {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  headers?: { [x: string]: string }
}
export type Callback<T> = (response: T) => void | Promise<void>
export type UploadArgs = {
  file: File
  progress?: (porcent: number) => void | Promise<void>
  error?: () => void | Promise<void>
}
export interface IHeaders {
  [x: string]: string
}
export interface IAPIConnector {
  setHeaders(headers?: IHeaders): void
  create<T>(data: T): Promise<void>
  read<T>(query: Partial<T>): Promise<T[]>
  update<T>(query: Partial<T>, data: Partial<T>): Promise<void>
  delete<T>(query: Partial<T>): Promise<void>
  upload(uploadArgs: UploadArgs): void
}
export interface IWebSocketsConnector {
  connect(url: string): void
  disconnect(): void
  onConnect(callback: () => void | Promise<void>): string
  onDisconnect(callback: () => void | Promise<void>): string
  on(event: 'connect' | 'disconnect', callback: Callback<void>): Promise<string>
  on<T = {}>(event: string, callback: Callback<T>): Promise<void>
  off(event: 'connect' | 'disconnect', uuid: string): void
  off(event: string, listener: any): void
  emit<T = void>(event: string, data?: object): Promise<T>
}
export type CreateAPIConnectorOpts = {
  path: string
  host?: string
}
export interface IServerConnector {
  createRealTimeConnector(host?: string): Promise<IWebSocketsConnector>
  createAPIConnector(opts: CreateAPIConnectorOpts, cipher?: ICipher): Promise<IAPIConnector>
}
export type Response<T> = {
  data: T
  error: {
    message: string
    stack: string
  }
}
import { EmitterDriver, EmittersDriver } from './../../../types/drivers/emitter'
import { Callback, WebSocketsConnector, SendArguments } from './../../../types/drivers/server'
import { io, Socket } from 'socket.io-client'

export class WebScoketsConnectorClass implements WebSocketsConnector {
  #socket: Socket
  #connectEmitter: EmitterDriver = this.emitters.createEmitter()
  #disconnectEmitter: EmitterDriver = this.emitters.createEmitter()
  constructor(private emitters: EmittersDriver, private host?: string) {
    const ioOpts = { transports: ['websocket'], autoConnect: false }
    this.#socket = this.host ? io(this.host, ioOpts) : io(ioOpts)
    this.#socket.on('connect', () => this.#connectEmitter.emmit())
    this.#socket.on('disconnect', () => this.#disconnectEmitter.emmit())
  }
  connect(): void {
    this.#socket.connect()
  }
  disconnect(): void {
    this.#socket.disconnect()
  }
  onConnect(callback: () => void | Promise<void>): string {
    return this.emitters.on('srv-connect', callback)
  }
  onDisconnect(callback: () => void | Promise<void>): string {
    return this.emitters.on('srv-disconnect', callback)
  }
  on(event: 'connect' | 'disconnect', callback: Callback<void>): Promise<string>
  on<T = {}>(event: string, callback: Callback<T>): Promise<void>
  async on(event: string, callback: any): Promise<string | void> {
    if (event === 'connect') {
      return this.#connectEmitter.on(callback)
    } else if (event === 'disconnect') {
      return this.#disconnectEmitter.on(callback)
    } else {
      this.#socket.on(event, callback)
    }
  }
  off(event: 'connect' | 'disconnect', uuid: string): void
  off(event: string, listener: any): void
  off(event: string, uuid?: any): void {
    if (event === 'connect') {
      this.#connectEmitter.off(uuid || '')
    } else if (event === 'disconnect') {
      this.#disconnectEmitter.off(uuid || '')
    } else {
      this.#socket.off(event, uuid)
    }
  }
  send<T = null>(args: SendArguments): Promise<T> {
    throw new Error('Method not implemented.');
  }
  emit<T = void>(event: string, data?: object | undefined): Promise<T> {
    return new Promise(resolve => this.#socket.emit(event, data, resolve))
  }
}
import { CallbackEmitter, IEmitter, IEmitters } from 'phoenix-builder'

type CallbackEmitterList = {
  [k: string] : CallbackEmitter<any>
}
class Emitter implements IEmitter {
  #CALLBACKS: CallbackEmitterList = {}
  on<T = undefined>(callback: CallbackEmitter<T>): string {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16)
    })
    this.#CALLBACKS[uuid] = callback
    return uuid
  }
  off(uuid: string): void {
    delete this.#CALLBACKS[uuid]
  }
  emmit<T = {}>(args?: T | undefined): void {
    const callbacks = Object.values(this.#CALLBACKS)
    for (const callback of callbacks) {
      callback(args)
    }
  }
}

export class Emitters implements IEmitters {
  #EMITTERS: Map<string, IEmitter> = new Map()
  on<T = undefined>(event: string, callback: CallbackEmitter<T>): string {
    if (!this.#EMITTERS.has(event)) {
      this.#EMITTERS.set(event, this.createEmitter())
    }
    return this.#EMITTERS.get(event)?.on(callback) || ''
  }
  off(event: string, uuid: string): void {
    this.#EMITTERS.get(event)?.off(uuid)
  }
  emmit<T = undefined>(event: string, args?: T | undefined): void {
    this.#EMITTERS.get(event)?.emmit(args)
  }
  createEmitter(): IEmitter {
    return new Emitter()
  }
}
export type CallbackEmitter<T = undefined> = (args: T) => void | Promise<void>
export interface IEmitter {
	on<T = undefined>(callback: CallbackEmitter<T>): string
	off(uuid: string): void
	emmit<T = {}>(args?: T): void
}
export interface IEmitters {
	on<T = undefined>(event: string, callback: CallbackEmitter<T>): string
	off(event: string, uuid: string): void
	emmit<T = undefined>(event: string, args?: T): void
	createEmitter(): IEmitter
}
export type EmitterList<T> = {
	[k in T]: IEmitter
}
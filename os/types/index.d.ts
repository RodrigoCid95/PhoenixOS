import { Kernel } from 'phoenix-core'
import { EmittersDriver } from 'phoenix-core/types/drivers/emitter'
export declare class WindowComponent extends HTMLElement {
  icon: string
  isDraggable: boolean
  isResize: boolean
  minimize: boolean
  width: number
  minWidth: number
  maxWidth: number
  height: number
  minHeight: number
  maxHeight: number
  autoFullScreen: boolean
  readonly isFocus: boolean
  onMount?(): void | Promise<void>
  onClose?(): void | Promise<void>
  close(): void
}
export type Launch = (manifest: Manifest, module: AppModule) => void | Promise<void>
export type OnReadyCallback = (launch: Launch) => void | Promise<void>
export type PhoenixOSOptions = {
  onReady?: OnReadyCallback
}
export class PhoenixOS extends Kernel {
  constructor(options?: PhoenixOSOptions)
}
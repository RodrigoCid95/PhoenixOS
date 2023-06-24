import { IKernel, IDriverList } from "./kernel"

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
}
export interface IManifest {
  packageName: string
  title: string
  description?: string
  author?: string[]
  icon?: string
  dependences?: Array<keyof IDriverList>
}
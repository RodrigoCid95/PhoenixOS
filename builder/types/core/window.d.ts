export interface IWindow extends HTMLElement {
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
  close(): void
}
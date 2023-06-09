import { IWindow } from 'phoenix-builder'

const __properties__ = Symbol()
export class WindowComponent1 extends HTMLElement implements IWindow {
  [__properties__] = {
    icon: '',
    draggable: true,
    move: false,
    resize: true,
    minimize: false,
    position: {
      isDragging: false,
      currentX: 0,
      currentY: 0,
      initialX: 0,
      initialY: 0,
      xOffset: 0,
      yOffset: 0
    },
    isFocus: false,
    width: {
      value: 0,
      min: 0,
      max: 0
    },
    height: {
      value: 0,
      min: 0,
      max: 0
    },
    resizeObserver: undefined,
    btnClose: undefined,
    btnMinimize: undefined,
    autoFullScreen: true,
    callbackAutoFullScreen: undefined,
    matchMedia: window.matchMedia('(max-width: 452px)')
  }
  onMount: any
  public set icon(v: string) {
    this[__properties__].icon = v
  }
  public get icon(): string {
    return this[__properties__].icon
  }
  public set isDraggable(v: boolean) {
    this[__properties__].draggable = v
  }
  public get isDraggable(): boolean {
    return this[__properties__].draggable
  }
  public set isResize(v: boolean) {
    this[__properties__].resize = v
    if (this.isConnected) {
      this.style.resize = this[__properties__].resize ? 'both' : 'none'
    }
  }
  public get isResize(): boolean {
    return this[__properties__].resize
  }
  public set minimize(v: boolean) {
    this[__properties__].minimize = v
    if (this.isConnected) {
      this.style.display = v ? 'none' : 'block'
      if (v) {
        this.focus()
      } else {
        this.blur()
      }
    }
  }
  public get minimize(): boolean {
    return this[__properties__].minimize
  }
  public get isFocus(): boolean {
    return this[__properties__].isFocus
  }
  public set width(v: number) {
    this[__properties__].width.value = v
    if (this.isConnected && this[__properties__].width.value > 0) {
      this.style.width = `${v}px`
    }
  }
  public get width(): number {
    return (this[__properties__].width.value > 0) ? this[__properties__].width.value : this.offsetWidth
  }
  public set minWidth(v: number) {
    this[__properties__].width.min = v
    if (this.isConnected && this[__properties__].width.min > 0) {
      this.style.minWidth = `${v}px`
    }
  }
  public get minWidth(): number {
    return this[__properties__].width.min
  }
  public set maxWidth(v: number) {
    this[__properties__].width.max = v
    if (this.isConnected && this[__properties__].width.max > 0) {
      this.style.maxWidth = `${v}px`
    }
  }
  public get maxWidth(): number {
    return this[__properties__].width.max
  }
  public set height(v: number) {
    this[__properties__].height.value = v
    if (this.isConnected && this[__properties__].height.value > 0) {
      this.style.height = `${v}px`
    }
  }
  public get height(): number {
    return (this[__properties__].height.value > 0) ? this[__properties__].height.value : this.offsetHeight
  }
  public set minHeight(v: number) {
    this[__properties__].height.min = v
    if (this.isConnected && this[__properties__].height.min > 0) {
      this.style.minHeight = `${v}px`
    }
  }
  public get minHeight(): number {
    return this[__properties__].height.min
  }
  public set maxHeight(v: number) {
    this[__properties__].height.max = v
    if (this.isConnected && this[__properties__].height.max > 0) {
      this.style.maxHeight = `${v}px`
    }
  }
  public get maxHeight(): number {
    return this[__properties__].height.max
  }
  public set autoFullScreen(v: boolean) {
    this[__properties__].autoFullScreen = v
    if (this.isConnected) {
      if (v) {
        this[__properties__].matchMedia.addEventListener('change', this[__properties__].callbackAutoFullScreen)
      } else {
        this[__properties__].matchMedia.removeEventListener('change', this[__properties__].callbackAutoFullScreen)
      }
    }
  }
  public get autoFullScreen(): boolean {
    return this[__properties__].autoFullScreen
  }
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this[__properties__].callbackAutoFullScreen = ({ matches }) => {
      if (matches) {
        this.setAttribute('fullscreen', '')
      } else {
        this.removeAttribute('fullscreen')
      }
    }
  }
  async connectedCallback() {
    this.style.display = 'none'
    const style = new CSSStyleSheet()
    style.replaceSync(':host{position:absolute;outline:#222428 solid 1px;height:85%;width:500px;overflow:hidden}slot{display:flex;flex-direction:column;height:100%;overflow:auto}@media (min-width:992px){:host{height:50%}}@media (max-width:576px){:host([fullscreen]){width:100%!important;height:100%!important;top:0!important;left:0!important;resize:none!important;transform:unset!important}}')
    this.shadowRoot.adoptedStyleSheets.push(style)
    this.width = this.width
    this.minWidth = this.minWidth
    this.maxWidth = this.maxWidth
    this.height = this.height
    this.minHeight = this.minHeight
    this.maxHeight = this.maxHeight
    this.shadowRoot.innerHTML = '<slot></slot>'
    requestAnimationFrame(() => {
      if (this.isConnected) {
        const x = (this.parentElement.clientWidth - this.clientWidth) / 2
        const y = (this.parentElement.clientHeight - this.clientHeight) / 2
        this.style.left = `${x}px`
        this.style.top = `${y}px`
        this.icon = this.icon
        this.minimize = this.minimize
        this.isResize = this.isResize
      }
    })
    const toolbarElement = this.shadowRoot.querySelector('slot')
    const dragStart = (e: MouseEvent | TouchEvent) => {
      if (this[__properties__].draggable && this[__properties__].autoFullScreen && !this[__properties__].matchMedia.matches) {
        if (e instanceof MouseEvent) {
          this[__properties__].position.initialX = e.clientX - this[__properties__].position.xOffset
          this[__properties__].position.initialY = e.clientY - this[__properties__].position.yOffset
          toolbarElement.addEventListener('mousemove', drag)
        } else if (e instanceof TouchEvent) {
          this[__properties__].position.initialX = e.touches[0].clientX - this[__properties__].position.xOffset
          this[__properties__].position.initialY = e.touches[0].clientY - this[__properties__].position.yOffset
          toolbarElement.addEventListener('touchmove', drag)
        }
        this[__properties__].position.isDragging = true
      }
    }
    const drag = (e: MouseEvent | TouchEvent) => {
      if (this[__properties__].draggable && this[__properties__].position.isDragging) {
        e.preventDefault()
        if (e instanceof MouseEvent) {
          this[__properties__].position.currentX = e.clientX - this[__properties__].position.initialX
          this[__properties__].position.currentY = e.clientY - this[__properties__].position.initialY
        } else if (e instanceof TouchEvent) {
          this[__properties__].position.currentX = e.touches[0].clientX - this[__properties__].position.initialX
          this[__properties__].position.currentY = e.touches[0].clientY - this[__properties__].position.initialY
        }
        this[__properties__].position.xOffset = this[__properties__].position.currentX
        this[__properties__].position.yOffset = this[__properties__].position.currentY
        this.style.transform = `translate3d(${this[__properties__].position.currentX}px, ${this[__properties__].position.currentY}px, 0)`
      }
    }
    const dragEnd = (e: MouseEvent | TouchEvent) => {
      this[__properties__].position.initialX = this[__properties__].position.currentX
      this[__properties__].position.initialY = this[__properties__].position.currentY
      if (e instanceof MouseEvent) {
        toolbarElement.removeEventListener('mousemove', drag)
      } else if (e instanceof TouchEvent) {
        toolbarElement.removeEventListener('touchmove', drag)
      }
      this[__properties__].position.isDragging
    }
    toolbarElement.addEventListener('mousedown', dragStart)
    toolbarElement.addEventListener('touchstart', dragStart)
    toolbarElement.addEventListener('mouseup', dragEnd)
    toolbarElement.addEventListener('touchend', dragEnd)
    this.tabIndex = 0
    this.focus()
    this.addEventListener('focus', () => this[__properties__].isFocus = true)
    this.addEventListener('blur', () => this[__properties__].isFocus = false)
    this[__properties__].resizeObserver = new ResizeObserver(([{ borderBoxSize: [{ blockSize, inlineSize }] }]) => {
      this[__properties__].width.value = inlineSize
      this[__properties__].height.value = blockSize
      this.dispatchEvent(new CustomEvent('onResize'))
    })
    this[__properties__].resizeObserver.observe(this)
    this.autoFullScreen = this.autoFullScreen
    requestAnimationFrame(() => {
      if (this[__properties__].matchMedia.matches && this.autoFullScreen) {
        this.setAttribute('fullscreen', '')
      }
    })
    if (this.onMount) {
      await this.onMount()
    }
    this.style.display = 'block'
  }
  disconnectedCallback() {
    this.dispatchEvent(new CustomEvent('onClose'))
    this[__properties__]?.resizeObserver?.unobserve(this)
  }
}

type WindowPosition = {
  isDragging: boolean
  currentX: number
  currentY: number
  initialX: number
  initialY: number
  xOffset: number
  yOffset: number
}

type WindowWith = {
  value: number
  min: number
  max: number
}

type WindowHeight = {
  value: number
  min: number
  max: number
}

type MediaQueryCallback = (args: { matches: boolean }) => void

export default class WindowComponent extends HTMLElement {
  //#region Provate properties
  #icon: string
  #draggable: boolean
  #move: boolean
  #resize: boolean
  #minimize: boolean
  #position: WindowPosition
  #isFocus: boolean
  #width: WindowWith
  #height: WindowHeight
  #resizeObserver: ResizeObserver
  #autoFullScreen: boolean
  #matchMedia: MediaQueryList
  #callbackAutoFullScreen: MediaQueryCallback
  //#endregion Provate properties
  //#region public Getters
  get icon(): string {
    return this.#icon
  }
  get isDraggable(): boolean {
    return this.#draggable
  }
  get isResize(): boolean {
    return this.#resize
  }
  get minimize(): boolean {
    return this.#minimize
  }
  get isFocus(): boolean {
    return this.#isFocus
  }
  get width(): number {
    return (this.#width.value > 0) ? this.#width.value : this.offsetWidth
  }
  get minWidth(): number {
    return this.#width.min
  }
  get maxWidth(): number {
    return this.#width.max
  }
  get height(): number {
    return (this.#height.value > 0) ? this.#height.value : this.offsetHeight
  }
  get minHeight(): number {
    return this.#height.min
  }
  get maxHeight(): number {
    return this.#height.max
  }
  get autoFullScreen(): boolean {
    return this.#autoFullScreen
  }
  //#endregion public Getters
  //#region public Setters
  set icon(v: string) {
    this.#icon = v
  }
  set isDraggable(v: boolean) {
    this.#draggable = v
  }
  set isResize(v: boolean) {
    this.#resize = v
    if (this.isConnected) {
      this.style.resize = this.#resize ? 'both' : 'none'
    }
  }
  set minimize(v: boolean) {
    this.#minimize = v
    if (this.isConnected) {
      this.style.display = this.#minimize ? 'none' : 'block'
      if (this.#minimize) {
        this.focus()
      } else {
        this.blur()
      }
    }
  }
  set width(v: number) {
    this.#width.value = v
    if (this.isConnected && this.#width.value > 0) {
      this.style.width = `${this.#width.value}px`
    }
  }
  set minWidth(v: number) {
    this.#width.min = v
    if (this.isConnected && this.#width.min > 0) {
      this.style.minWidth = `${this.#width.min}px`
    }
  }
  set maxWidth(v: number) {
    this.#width.max = v
    if (this.isConnected && this.#width.max > 0) {
      this.style.maxWidth = `${this.#width.max}px`
    }
  }
  set height(v: number) {
    this.#height.value = v
    if (this.isConnected && this.#height.value > 0) {
      this.style.height = `${this.#height.value}px`
    }
  }
  set minHeight(v: number) {
    this.#height.min = v
    if (this.isConnected && this.#height.value > 0) {
      this.style.minHeight = `${this.#height.min}px`
    }
  }
  set maxHeight(v: number) {
    this.#height.max = v
    if (this.isConnected && this.#height.max > 0) {
      this.style.maxHeight = `${this.#height.max}px`
    }
  }
  set autoFullScreen(v: boolean) {
    this.#autoFullScreen = v
    if (this.isConnected) {
      this.#matchMedia.addEventListener('change', this.#callbackAutoFullScreen)
    } else {
      this.#matchMedia.removeEventListener('change', this.#callbackAutoFullScreen)
    }
  }
  //#endregion public Setters
  constructor() {
    super()
    this.#icon = ''
    this.#draggable = true
    this.#move = false
    this.#resize = true
    this.#minimize = false
    this.#position = {
      isDragging: false,
      currentX: 0,
      currentY: 0,
      initialX: 0,
      initialY: 0,
      xOffset: 0,
      yOffset: 0
    }
    this.#isFocus = false
    this.#width = { value: 0, min: 0, max: 0 }
    this.#height = { value: 0, min: 0, max: 0 }
    this.#resizeObserver = new ResizeObserver(([{ borderBoxSize: [{ blockSize, inlineSize }] }]) => {
      this.#width.value = inlineSize
      this.#height.value = blockSize
      this.dispatchEvent(new CustomEvent('onResize'))
    })
    this.#resizeObserver.observe(this)
    this.#autoFullScreen = true
    this.#callbackAutoFullScreen = ({ matches }) => {
      if (matches) {
        this.setAttribute('fullscreen', '')
      } else {
        this.removeAttribute('fullscreen')
      }
    }
    this.#matchMedia = window.matchMedia('(max-width: 452px)')
    this.attachShadow({ mode: 'open' })
  }
  connectedCallback() {
    if (!this.shadowRoot) {
      return
    }
    this.style.display = 'none'
    const style = new CSSStyleSheet()
    style.replaceSync(':host{position:absolute;outline:#222428 solid 1px;height:85%;width:500px;overflow:hidden}slot{display:flex;flex-direction:column;height:100%;overflow:auto}@media (min-width:992px){:host{height:50%}}@media (max-width:576px){:host([fullscreen]){width:100%!important;height:100%!important;top:0!important;left:0!important;resize:none!important;transform:unset!important}}')
    this.shadowRoot?.adoptedStyleSheets.push(style)
    this.width = this.width
    this.minWidth = this.minWidth
    this.maxWidth = this.maxWidth
    this.height = this.height
    this.minHeight = this.minHeight
    this.maxHeight = this.maxHeight
    this.shadowRoot.innerHTML = '<slot></slot>'
    requestAnimationFrame(() => {
      if (this.isConnected && this.parentElement) {
        const x = (this.parentElement.clientWidth - this.clientWidth) / 2
        const y = (this.parentElement.clientHeight - this.clientHeight) / 2
        this.style.left = `${x}px`
        this.style.top = `${y}px`
        this.icon = this.icon
        this.minimize = this.minimize
        this.isResize = this.isResize
      }
      if (this.#matchMedia.matches && this.#autoFullScreen) {
        this.setAttribute('fullscreen', '')
      }
    })
    const toolbarElement = this.shadowRoot.querySelector('slot')
  }
  disconnectedCallback(): void {
    this.#resizeObserver.unobserve(this)
    this.dispatchEvent(new CustomEvent('onClose'))
  }
}
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

export class WindowComponent extends HTMLElement {
  onMount?: () => void | Promise<void>
  onClose?: () => void | Promise<void>
  //#region Provate properties
  #icon: string
  #draggable: boolean
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
  async connectedCallback() {
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
    const draggableZone = this.shadowRoot.querySelector('slot') as HTMLSlotElement
    const dragStart = (e: MouseEvent | TouchEvent) => {
      if (this.#draggable && this.#autoFullScreen && !this.#matchMedia.matches) {
        if (e instanceof MouseEvent) {
          this.#position.initialX = e.clientX - this.#position.xOffset
          this.#position.initialY = e.clientY - this.#position.yOffset
          draggableZone.addEventListener('mousemove', drag)
        } else if (e instanceof TouchEvent) {
          this.#position.initialX = e.touches[0].clientX - this.#position.xOffset
          this.#position.initialY = e.touches[0].clientY - this.#position.yOffset
          draggableZone.addEventListener('touchmove', drag)
        }
        this.#position.isDragging = true
      }
    }
    const drag = (e: MouseEvent | TouchEvent) => {
      if (this.#draggable && this.#position.isDragging) {
        e.preventDefault()
        if (e instanceof MouseEvent) {
          this.#position.currentX = e.clientX - this.#position.initialX
          this.#position.currentY = e.clientY - this.#position.initialY
        } else if (e instanceof TouchEvent) {
          this.#position.currentX = e.touches[0].clientX - this.#position.initialX
          this.#position.currentY = e.touches[0].clientY - this.#position.initialY
        }
        this.#position.xOffset = this.#position.currentX
        this.#position.yOffset = this.#position.currentY
        this.style.transform = `translate3d(${this.#position.currentX}px, ${this.#position.currentY}px, 0)`
      }
    }
    const dragEnd = (e: MouseEvent | TouchEvent) => {
      this.#position.initialX = this.#position.currentX
      this.#position.initialY = this.#position.currentY
      if (e instanceof MouseEvent) {
        draggableZone.removeEventListener('mousemove', drag)
      } else if (e instanceof TouchEvent) {
        draggableZone.removeEventListener('touchmove', drag)
      }
      this.#position.isDragging
    }
    draggableZone.addEventListener('mousedown', dragStart)
    draggableZone.addEventListener('touchstart', dragStart)
    draggableZone.addEventListener('mouseup', dragEnd)
    draggableZone.addEventListener('touchend', dragEnd)
    this.tabIndex = 0
    this.focus()
    this.addEventListener('focus', () => this.#isFocus = true)
    this.addEventListener('blur', () => this.#isFocus = false)
    this.#resizeObserver = new ResizeObserver(([{ borderBoxSize: [{ blockSize, inlineSize }] }]) => {
      this.#width.value = inlineSize
      this.#height.value = blockSize
      this.dispatchEvent(new CustomEvent('onResize'))
    })
    this.#resizeObserver.observe(this)
    this.autoFullScreen = this.autoFullScreen
    requestAnimationFrame(() => {
      if (this.#matchMedia.matches && this.autoFullScreen) {
        this.setAttribute('fullscreen', '')
      }
    })
    if (this.onMount) {
      await this.onMount()
    }
    this.style.display = 'block'
  }
  async disconnectedCallback() {
    if (this.onClose) {
      await this.onClose()
    }
    this.#resizeObserver.unobserve(this)
    this.dispatchEvent(new CustomEvent('onClose'))
  }
  close() {
    this.remove()
  }
}
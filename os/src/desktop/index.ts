import { IKernel } from "phoenix-builder"
import _styles from './style.scss'
import _template from './template.html'

export default class Desktop {
  #progressBarRef: HTMLIonProgressBarElement
  #desktopRef: HTMLDivElement
  constructor(private kernel: IKernel, private loadStyles: (cssstylesheet: CSSStyleSheet) => string) {
    const ionApp = document.createElement('ion-app')
    ionApp.style.zIndex = '0'
    this.#progressBarRef = document.createElement('ion-progress-bar')
    this.#progressBarRef.type = 'indeterminate'
    this.#progressBarRef.style.display = 'none'
    this.#desktopRef = document.createElement('div')
    this.#desktopRef.classList.add('desktop')
    
  }
}
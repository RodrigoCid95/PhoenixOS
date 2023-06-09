import { IKernel } from 'phoenix-builder'
import _spStyles from 'splash-screen/styles.scss'
import _spTemplate from 'splash-screen/template.html'

export default class {
  constructor(private kernel: IKernel) {
    this.init()
  }
  #loadCSS({ cssRules }: CSSStyleSheet): string {
    let css: string[] = []
    for (let index = 0; index < cssRules.length; index++) {
      const rule = cssRules.item(index)
      css.push(rule?.cssText || '')
    }
    return css.join('\n')
  }
  async init() {
    const spStyles = document.createElement('style')
    spStyles.innerHTML = this.#loadCSS(_spStyles)
    document.body.innerHTML = `${spStyles.outerHTML}\n${_spTemplate}`
    const uiPath = '/js/ionicui/index.esm.js'
    await import(uiPath).then(({ initUI }) => initUI())
    await new Promise(resolve => setTimeout(resolve, 1500))
    const { default: initLogin } = await import('login')
    await initLogin(this.kernel)
    document.body.innerHTML = `${spStyles.outerHTML}\n${_spTemplate}`
    const { default: Desktop } = await import('desktop')
    await new Promise(resolve => setTimeout(resolve, 1500))
    new Desktop(this.kernel, this.#loadCSS)
  }
}
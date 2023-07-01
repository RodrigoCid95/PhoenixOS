import template from './template.html'

export default class LauncherSettingsController extends window.ViewController {
  static template: string = template
  onMount() {
    const config = JSON.parse(localStorage.getItem('ion-config') || '{}')
    const { mode = '', backButtonText = '', animated = true } = config
    const animationsRef = this.viewElement.querySelector<HTMLSelectElement>('[name="animations"]')
    const designRef = this.viewElement.querySelector<HTMLSelectElement>('[name="design"]')
    const inputBackTextRef = this.viewElement.querySelector<HTMLInputElement>('[name="textBackButton"]')
    animationsRef!.value = animated ? '' : 'false'
    designRef!.value = mode
    inputBackTextRef!.value = backButtonText
    if (mode !== 'ios') {
      (this.viewElement.querySelector('[name="textBackButtonItem"]') as any).style.display = 'none'
    }
    animationsRef!.addEventListener('ionChange', ({ detail: { value } }: any) => {
      if (value) {
        config.animated = false
      } else {
        delete config.animated
      }
      localStorage.setItem('ion-config', JSON.stringify(config))
    })
    designRef!.addEventListener('ionChange', ({ detail: { value } }: any) => {
      if (value === 'ios') {
        (this.viewElement.querySelector('[name="textBackButtonItem"]') as any).style.display = 'block'
      } else {
        (this.viewElement.querySelector('[name="textBackButtonItem"]') as any).style.display = 'none'
      }
      if (!value) {
        delete config.mode
      } else {
        config.mode = value
      }
      localStorage.setItem('ion-config', JSON.stringify(config))
    })
    inputBackTextRef!.addEventListener('ionChange', ({ detail: { value } }: any) => {
      if (value) {
        config.backButtonText = value
      } else {
        delete config.backButtonText
      }
      localStorage.setItem('ion-config', JSON.stringify(config))
    })
  }
}
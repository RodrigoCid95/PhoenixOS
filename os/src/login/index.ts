import { EmittersDriver } from 'phoenix-core/types/drivers/emitter'
import { AuthError } from './../classes/errors'
import _template from './template.html'

export default class AppLoginController extends window.ViewController {
  static template = _template
  emitters!: EmittersDriver
  #modalRef!: any
  onMount() {
    this.#modalRef = this.viewElement.querySelector<any>('ion-modal')
    this.#modalRef.backdropDismiss = false
    this.viewElement.querySelector('#enter')?.addEventListener('click', async () =>
      fetch('/auth', { method: 'POST' })
        .then(res => res.json())
        .then(auth => {
          if (auth) {
            this.emitters.emmit('auth', auth)
          } else {
            throw new AuthError()
          }
        })
        .catch(error => console.error(error))
    )
  }
  onClose(): void | Promise<void> {
    this.#modalRef.dismiss()
  }
}
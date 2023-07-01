import { IEmitters } from 'phoenix-builder'
import _template from './template.html'

export default class AppLoginController extends window.ViewController {
  static template = _template
  emitters!: IEmitters
  onMount() {
    this.viewElement.querySelector<any>('ion-modal').backdropDismiss = false
    this.viewElement.querySelector('#enter')?.addEventListener('click', async () =>
      fetch('/auth', { method: 'POST' })
        .then(res => res.json())
        .then(auth => {
          if (auth) {
            this.emitters.emmit('auth', auth)
          } else {
            throw new AuthErrorClass()
          }
        })
        .catch(error => console.error(error))
    )
  }
}

class AuthErrorClass extends Error {
  constructor() {
    super()
    this.name = 'AuthErrorClass'
    this.message = 'El usuario o la contraseña falló!'
  }
}
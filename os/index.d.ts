import { loadingController as LoadingController, modalController as ModalController, pickerController as PickerController, toastController as ToastController } from '@ionic/core'
import { ControllerClassConstructable, IndexControllerClassConstructable } from 'phoenix-builder'

declare global {
  interface Window {
    loadingController: typeof LoadingController
    modalController: typeof ModalController
    pickerController: typeof PickerController
    toastController: typeof ToastController
    IndexController: IndexControllerClassConstructable
    Controller: ControllerClassConstructable
  }
}
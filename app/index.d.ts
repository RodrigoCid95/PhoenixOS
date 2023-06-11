import { IndexControllerClass, loadingController as LoadingController, modalController as ModalController, pickerController as PickerController, toastController as ToastController } from '@ionic/core'
import { ViewControllerConstructable } from 'phoenix-builder'

declare global {
  interface Window {
    loadingController: typeof LoadingController
    modalController: typeof ModalController
    pickerController: typeof PickerController
    toastController: typeof ToastController
    ViewController: ViewControllerConstructable
  }
}
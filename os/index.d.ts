import { loadingController as LoadingController, modalController as ModalController, pickerController as PickerController, toastController as ToastController } from '@ionic/core'
import { ViewControllerConstructable } from 'phoenix-core/types/view-controller'
import { ServiceConstructable } from 'phoenix-core/types/service'
import { WindowComponent } from './types'

declare global {
  interface Window {
    loadingController: typeof LoadingController
    modalController: typeof ModalController
    pickerController: typeof PickerController
    toastController: typeof ToastController
    ViewController: ViewControllerConstructable<WindowComponent>
    Service: ServiceConstructable
  }
}
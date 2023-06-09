import { IKernel } from "phoenix-builder"
import _template from './template.html'

export default (kernel: IKernel) => new Promise<void>(async resolve => {
  const content = document.createElement('div')
  content.innerHTML = _template
  document.body.innerHTML = ''
  const modal = await window.modalController.create({
    component: content,
    backdropDismiss: false
  })
  await modal.present()
  document.getElementById('enter')?.addEventListener('click', () => resolve())
})
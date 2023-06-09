import { setupConfig, loadingController, modalController, pickerController, toastController } from '@ionic/core';

export default async () => {
  const localMode = localStorage.getItem('mode');
  let mode: 'ios' | 'md' = 'md';
  if (localMode && (localMode === 'ios' || localMode === 'md')) {
    mode = localMode;
  }
  setupConfig({
    mode
  });
  (window as any).loadingController = loadingController;
  (window as any).modalController = modalController;
  (window as any).pickerController = pickerController;
  (window as any).toastController = toastController;
}
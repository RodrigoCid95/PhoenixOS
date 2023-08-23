import template from './template.html'

document.body.innerHTML = ''
document.body.innerHTML = template

import('phoenix-os').then(({ PhoenixOS }) => {
  Object.defineProperty(window, 'os', { value: new PhoenixOS({
    onReady: async (launch) => {
      const { default: appModule } = await import('./app')
      const { default: manifest } = await import('./manifest.json')
      launch(manifest, appModule)
    }
  }), writable: false })
})
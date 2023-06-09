export { Components, JSX } from './components'

export const initUI = async () => {
  await fetch('/js/ionicui/ionicui.css')
    .then(res => res.text())
    .then(res => {
      const styleTag = document.createElement('style')
      styleTag.innerHTML = res
      document.head.append(styleTag)
    })
  const appPath = '/js/ionicui/ionicui.esm.js'
  await import(appPath)
}
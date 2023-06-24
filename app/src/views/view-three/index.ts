import IndexService from 'services'
import template from './template.html'

export default class AppPageTwo extends window.ViewController {
  static template = template
  static shadow: boolean = false
  async onMount() {
    const iService: IndexService = await this.getService('IndexService')
    const { coords: { latitude, longitude } } = await iService.getLocation()
    console.log(latitude, longitude)
  }
}
import { APIConnectorConstructable } from 'phoenix-core/types/drivers/api-connector'
import IndexService from '../../services'
import template from './template.html'

interface Person {
  id: string
  name: string
  age: number
}

export default class AppOne extends window.ViewController {
  static template = template
  async onMount() {
    this.viewElement.querySelector('[name="minimize"]')?.addEventListener('click', () => this.containerElement.minimize = true)
    this.viewElement.querySelector('[name="close"]')?.addEventListener('click', () => this.containerElement.close())
    const iService: IndexService = await this.getService('IndexService')
    const APIConnector: APIConnectorConstructable<Person> = await iService.getDriver('api-connector')
    const ipBaseConnector = new APIConnector({ host: 'https://api.ipbase.com', path: ['v1', 'json'] })
    const response = await ipBaseConnector.read()
    console.log(response)
  }
}
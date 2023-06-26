export default class IndexService extends window.Service {
  async getLocation() {
    const gDriver = await this.getDriver('geolocation')
    return await gDriver.getCurrentPosition()
  }
}
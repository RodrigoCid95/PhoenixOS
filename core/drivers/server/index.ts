import { Cipher } from 'drivers/cipher'
import { CreateAPIConnectorOpts, IAPIConnector, IEmitters, IServerConnector, IWebSocketsConnector } from 'phoenix-builder'

export class Server implements IServerConnector {
  constructor(private emitters: IEmitters) { }
  async createRealTimeConnector(host?: string): Promise<IWebSocketsConnector> {
    const { WebScoketsConnector } = await import('./web-sckets-connector')
    return new WebScoketsConnector(this.emitters, host)
  }
  async createAPIConnector(opts: CreateAPIConnectorOpts, cipher?: Cipher): Promise<IAPIConnector> {
    const { APIConnector } = await import('./api-connector')
    return new APIConnector(opts, cipher)
  }
}
import { EmittersDriver } from './../../../types/drivers/emitter'
import { CreateAPIConnectorOpts, APIConnector, ServerConnector, WebSocketsConnector } from './../../../types/drivers/server'

export class Server implements ServerConnector {
  constructor(private emitters: EmittersDriver) { }
  async createRealTimeConnector(host?: string): Promise<WebSocketsConnector> {
    const { WebScoketsConnectorClass } = await import('./web-sckets-connector')
    return new WebScoketsConnectorClass(this.emitters, host)
  }
  async createAPIConnector(opts: CreateAPIConnectorOpts): Promise<APIConnector> {
    const { APIConnectorClass } = await import('./api-connector')
    return new APIConnectorClass(opts)
  }
}
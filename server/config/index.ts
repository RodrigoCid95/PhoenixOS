import path from 'node:path'
import { PhoenixHTTPConfigProfile } from 'phoenix-js/http'

export const phoenixHttpConfig: PhoenixHTTPConfigProfile = {
  pathsPublic: [
    { route: '/', dir: path.resolve(__dirname, '..', 'public') }
  ]
}
import { APIConnector, CreateAPIConnectorOpts, UploadArgs } from "../../../types/drivers/api-connector"

enum Methods {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
export class APIConnectorDriver implements APIConnector {
  #headers?: Headers
  #endpoint: string
  constructor(private opts: CreateAPIConnectorOpts = { path: [] }) {
    const { host = document.baseURI, path } = this.opts
    this.#endpoint = (new URL(path.join('/'), host)).href
  }
  setHeaders(headers?: any): void {
    if (headers) {
      const keys: any = Object.keys(headers)
      const newHeaders = new Headers()
      for (const key of keys) {
        const value = keys[key]
        newHeaders.append(key, value)
      }
    } else {
      this.#headers = undefined
    }
  }
  #prepareFetchOpts(options: { method?: string, data?: any }) {
    const { method, data } = options
    const fetchOpts: any = {}
    if (method) {
      Object.defineProperty(fetchOpts, 'method', { value: method, writable: false })
    }
    if (data) {
      Object.defineProperty(fetchOpts, 'body', { value: JSON.stringify(data), writable: false })
    }
    if (this.#headers) {
      Object.defineProperty(fetchOpts, 'headers', { value: this.#headers, writable: false })
    }
    return fetchOpts
  }
  async create<T>(data: T): Promise<void> {
    const fetchOpts = this.#prepareFetchOpts({ method: Methods.POST, data })
    await fetch(this.#endpoint, fetchOpts)
  }
  async read<T>(query?: Partial<T>): Promise<T[]> {
    const fetchOpts = this.#prepareFetchOpts({})
    let uri = this.#endpoint
    if (query) {
      const params = []
      for (const key in query) {
        const value = query[key]
        params.push(`${key}=${value}`)
      }
      uri = `${this.#endpoint}?${params.join('&')}`
    }
    const response = await fetch(uri, fetchOpts)
    const objRes = await response.json()
    return objRes
  }
  async update<T>(query: Partial<T>, data: Partial<T>): Promise<void> {
    const fetchOpts = this.#prepareFetchOpts({ method: Methods.PUT, data: { query, data } })
    await fetch(this.#endpoint, fetchOpts)
  }
  async delete<T>(query: Partial<T>): Promise<void> {
    const fetchOpts = this.#prepareFetchOpts({ method: Methods.DELETE, data: query })
    await fetch(this.#endpoint, fetchOpts)
  }
  upload(uploadArgs: UploadArgs): void {
    throw new Error('Method not implemented.');
  }
}
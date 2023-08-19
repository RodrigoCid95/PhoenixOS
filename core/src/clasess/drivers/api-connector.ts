import { CipherDriver } from './../../../types/drivers/cipher'
import { APIConnector, CreateAPIConnectorOpts, UploadArgs } from '../../../types/drivers/server'

enum Methods {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
export class APIConnectorClass implements APIConnector {
  #headers?: Headers
  #endpoint: string
  #keyCipher!: CryptoKey
  constructor(private opts: CreateAPIConnectorOpts, private cipher?: CipherDriver) {
    const { host, path } = this.opts
    this.#endpoint = `${host}/${path}`
    if (this.cipher) {
      this.cipher.generateKey().then(key => this.#keyCipher = key)
    }
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
  #prepareFetchOpts(method: string, data?: any) {
    const fetchOpts: any = { method }
    if (data) {
      if (this.cipher) {
        const newData = this.cipher.encrypt(this.#keyCipher, JSON.stringify(data))
        fetchOpts['body'] = newData
      } else {
        fetchOpts['body'] = JSON.stringify(data)
      }
    }
    if (this.#headers) {
      fetchOpts['headers'] = this.#headers
    }
    return fetchOpts
  }
  async create<T>(data: T): Promise<void> {
    const fetchOpts = this.#prepareFetchOpts(Methods.POST, data)
    await fetch(this.#endpoint, fetchOpts)
  }
  async read<T>(query: Partial<T>): Promise<T[]> {
    const fetchOpts = this.#prepareFetchOpts(Methods.GET, query)
    const response = await fetch(this.#endpoint, fetchOpts)
    if (this.cipher) {
      let strRes = await response.text()
      strRes = await this.cipher.decrypt(this.#keyCipher, strRes)
      const objRes = JSON.parse(strRes)
      return objRes
    } else {
      const objRes = await response.json()
      return objRes
    }
  }
  async update<T>(query: Partial<T>, data: Partial<T>): Promise<void> {
    const fetchOpts = this.#prepareFetchOpts(Methods.PUT, { query, data })
    await fetch(this.#endpoint, fetchOpts)
  }
  async delete<T>(query: Partial<T>): Promise<void> {
    const fetchOpts = this.#prepareFetchOpts(Methods.DELETE, query)
    await fetch(this.#endpoint, fetchOpts)
  }
  upload(uploadArgs: UploadArgs): void {
    throw new Error('Method not implemented.');
  }
}
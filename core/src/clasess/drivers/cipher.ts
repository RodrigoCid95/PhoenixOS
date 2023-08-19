import { CipherDriver } from '../../../types/drivers/cipher'

export class Cipher implements CipherDriver {
  #encoder = new TextEncoder()
  #decoder = new TextDecoder()
  generateKey(key?: string) {
    if (!key) {
      key = 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16)
      })
    }
    return crypto.subtle.importKey('raw', this.#encoder.encode(key.slice(0, 16)), { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt'])
  }
  async isEnable(): Promise<boolean> {
    return window.crypto.subtle !== undefined
  }
  async encrypt(key: CryptoKey | string, data: string): Promise<string> {
    if (!this.isEnable()) {
      throw new CipherNotSupport()
    }
    const newKey = typeof key ===  'string' ? await this.generateKey(key) : key
    const iv = crypto.getRandomValues(new Uint8Array(12))
    const encrypted = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, newKey, this.#encoder.encode(data)))
    const combined = new Uint8Array(iv.length + encrypted.length)
    combined.set(iv)
    combined.set(encrypted, iv.length)
    let result = ''
    for (let i = 0; i < combined.length; i++) {
      result += combined[i].toString(16).padStart(2, '0')
    }
    return result
  }
  async decrypt(key: CryptoKey | string, strEncrypted: string): Promise<string> {
    if (!this.isEnable()) {
      throw new CipherNotSupport()
    }
    const newKey = typeof key ===  'string' ? await this.generateKey(key) : key
    let uint8Array = new Uint8Array(strEncrypted.length / 2)
    for (let i = 0; i < strEncrypted.length; i += 2) {
      uint8Array[i / 2] = parseInt(strEncrypted.substr(i, 2), 16)
    }
    const iv = uint8Array.slice(0, 12)
    const data = uint8Array.slice(12, uint8Array.length)
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, newKey, data)
    return this.#decoder.decode(decrypted)
  }
}

export class CipherNotSupport extends Error {
  constructor() {
    super('No está disponible el cifrado!')
    this.name = 'CipherNotSupport'
  }
}
export interface ICipher {
  isEnable(): Promise<boolean>
  generateKey(key?: string): Promise<CryptoKey>
  encrypt(key: CryptoKey | string, data: string): Promise<string>
  decrypt(key: CryptoKey | string, strEncrypted: string): Promise<string>
}
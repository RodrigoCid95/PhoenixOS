/* import { ILocalDB, CreateDBDefOptions, IDBRef } from './../../types'

export class LocalDBClass implements ILocalDB {
  createDBDef({ name, version, stores = [], oldStores = [] }: CreateDBDefOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(name, version)
      request.onupgradeneeded = () => {
        const db = request.result
        for (const store of stores) {
          const strOpts: any = {}
          if (store.key) {
            strOpts['keyPath'] = store.key.name
            if (store.key.autoincrement) {
              strOpts['autoIncrement'] = true
            }
          }
          const objectStore = db.createObjectStore(store.name, strOpts)
          const { indexes = [] } = store
          for (const index of indexes) {
            const indOpts: any = {}
            if (index.unique) {
              indOpts['unique'] = true
            }
            if (index.multiEntry) {
              indOpts['multiEntry'] = true
            }
            objectStore.createIndex(index.name, index.name, indOpts)
          }
        }
        for (const oldStore of oldStores) {
          db.deleteObjectStore(oldStore)
        }
        resolve()
      }
      request.onerror = () => reject(new CreateDBException(name))
    })
  }
  createDBRef(name: string): Promise<IDBRef> {
    throw new Error('Method not implemented.');
  }
}
export class CreateDBException extends Error {
  constructor(dbName: string) {
    super()
    this.name = 'CreateDBException'
    this.message = `No se pudo crear la base de datos "${dbName}".`
  }
} */
class Service {
  static isService: boolean
}

Object.defineProperty(Service, 'isService', { value: true, writable: false })
Object.defineProperty(window, 'Service', { value: Service, writable: false })
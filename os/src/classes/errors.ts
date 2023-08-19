export class ServiceNotExist extends Error {
  constructor(nameService: string) {
    super(`El servicio "${nameService}" no existe!`)
    this.name = 'ServiceNotExist'
  }
}

export class WithOutServices extends Error {
  constructor() {
    super('No se definieron dependencias!')
    this.name = 'WithOutServices'
  }
}

export class DriverPermissionDenied extends Error {
  constructor(name: string) {
    super(`No tienes permiso para usar el driver "${name}"`)
    this.name = 'DriverPermissionDenied'
  }
}

export class AuthError extends Error {
  constructor() {
    super()
    this.name = 'AuthError'
    this.message = 'El usuario o la contraseña falló!'
  }
}
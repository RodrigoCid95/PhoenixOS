import { PermissionsDriver, OnChangePermission, Permission, PermissionState } from './../../../types/drivers/permissions'

export class PermissionsClass implements PermissionsDriver {
  async query(permission: Permission): Promise<PermissionState> {
    const { state } = await navigator.permissions.query({ name: permission })
    return state as PermissionState
  }
  async onChange(permission: Permission, callback: OnChangePermission): Promise<void> {
    const result = await navigator.permissions.query({ name: permission })
    result.onchange = () => (_this: PermissionStatus) => callback(_this.state as PermissionState)
  }
  async request(permission: Permission): Promise<boolean> {
    switch (permission) {
      case 'geolocation':
        return await new Promise(resolve => navigator.geolocation.getCurrentPosition(() => resolve(true), () => resolve(false)))
      case 'notifications':
        return await new Promise(resolve => Notification.requestPermission(result => resolve(result === 'granted')))
      default:
        return true
    }
  }
}
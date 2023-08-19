export type Permission = 'geolocation' | 'notifications'
export type PermissionState = 'granted' | 'denied' | 'prompt'
export type OnChangePermission = (permission: PermissionState) => void
export interface PermissionsDriver {
  query(permission: Permission): Promise<PermissionState>
  onChange(permission: Permission, callback: OnChangePermission): Promise<void>
  request(permission: Permission): Promise<boolean>
}
export interface PermissionsConstructable {
  new(): PermissionsDriver
}
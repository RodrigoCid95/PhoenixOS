export declare type Permission = 'geolocation' | 'notifications'
export declare type PermissionState = 'granted' | 'denied' | 'prompt'
export declare type OnChangePermission = (permission: PermissionState) => void
export declare interface IPermissions {
  query(permission: Permission): Promise<PermissionState>
  onChange(permission: Permission, callback: OnChangePermission): Promise<void>
  request(permission: Permission): Promise<boolean>
}
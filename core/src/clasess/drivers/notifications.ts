import { EmitterDriver, EmittersDriver } from './../../../types/drivers/emitter'
import { EventCallback, LocalNotificationDriver, LocalNotificationsDriver } from './../../../types/drivers/notifications'
import { Permissions } from './../../../types/drivers/permissions'

class LocalNotification implements LocalNotificationDriver {
  #NOTIFICATION?: Notification
  data?: any
  body: string = ''
  icon: string = ''
  lang: string = ''
  tag: string = ''
  title: string = ''
  constructor(private permissions: Permissions, private emitter: EmitterDriver) { }
  async #checkPermission() {
    const PERMISSION = await this.permissions.query('notifications')
    if (PERMISSION === 'denied') {
      throw {
        code: 'permission-denied',
        message: 'No tienes permiso para usar notificaciones!'
      }
    }
  }
  async launch(): Promise<void> {
    await this.#checkPermission()
    this.#NOTIFICATION = new Notification(this.title, {
      body: this.body,
      data: this.data,
      icon: this.icon,
      lang: this.lang,
      tag: this.tag
    })
    this.#NOTIFICATION.onclose = (...args) => this.emitter.emmit(...args)
    this.#NOTIFICATION.onclick = (...args) => this.emitter.emmit(...args)
    this.#NOTIFICATION.onerror = (...args) => this.emitter.emmit(...args)
    this.#NOTIFICATION.onshow = (...args) => this.emitter.emmit(...args)
  }
  onclose(eventCallback: EventCallback): string {
    return this.emitter.on(eventCallback)
  }
  onclick(eventCallback: EventCallback): string {
    return this.emitter.on(eventCallback)
  }
  onerror(eventCallback: EventCallback): string {
    return this.emitter.on(eventCallback)
  }
  onshow(eventCallback: EventCallback): string {
    return this.emitter.on(eventCallback)
  }
  close(): void {
    if (this.#NOTIFICATION) {
      this.#NOTIFICATION.close()
      this.#NOTIFICATION = undefined
    }
  }
}
export class LocalNotifications implements LocalNotificationsDriver {
  constructor(private permissions: Permissions, private emitters: EmittersDriver) { }
  createNotification(): LocalNotificationDriver {
    return new LocalNotification(this.permissions, this.emitters.createEmitter())
  }
}
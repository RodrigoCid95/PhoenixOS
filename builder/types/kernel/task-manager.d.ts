export interface ITask<T> {
  PID: string
  icon?: string
  title: string
  description: string
  readonly el: T
  kill(): void
}
export interface ITaskClass<T> {
  new(el: T): ITask<T>
}
export type TaskManagerEvent = 'new' | 'kill' | 'change'
export type TaskManagerEventCallback = () => void
export type AddTaskOptions = Omit<Omit<ITask<T>, 'PID'>, 'kill'>
export interface ITaskManager {
  add<T>(options: AddTaskOptions): ITask<T>
  readonly tasks: ITask<any>[]
  kill(PID: string): void
  on(event: TaskManagerEvent, callback: TaskManagerEventCallback): string
  off(event: TaskManagerEvent, uuid: string): void
}
import { ITaskManager, ITask, TaskManagerEvent, TaskManagerEventCallback, IEmitters, IEmitter } from "phoenix-builder"

export type EmitterList = {
	[k in TaskManagerEvent]?: IEmitter
}
export class TaskManager implements ITaskManager {
  #tasks: Map<string, ITask<any>>
  #emitters: EmitterList
  get tasks(): ITask<any>[] {
    const results: ITask<any>[] = []
    this.#tasks.forEach(task => results.push(task))
    return results
  }
  constructor() {
    this.#tasks = new Map()
    this.#emitters = {}
  }
  setEmitterDriver(emitters: IEmitters) {
    this.#emitters = {
      new: emitters.createEmitter(),
      kill: emitters.createEmitter(),
      change: emitters.createEmitter()
    }
  }
  run<T>({ title, description, icon, el }: Omit<Omit<ITask<T>, 'PID'>, 'kill'>): ITask<T> {
    const PID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16)
    })
    const newTask = {
      PID,
      icon,
      title,
      description,
      el,
      kill: () => this.kill(PID)
    }
    this.#tasks.set(PID, newTask)
    this.#emitters.new?.emmit()
    this.#emitters.change?.emmit()
    return newTask
  }
  kill(PID: string): void {
    if (this.#tasks.has(PID)) {
      this.#tasks.delete(PID)
      this.#emitters.kill?.emmit()
      this.#emitters.change?.emmit()
    }
  }
  on(event: TaskManagerEvent, callback: TaskManagerEventCallback): string {
    return this.#emitters[event]?.on(callback) || ''
  }
  off(event: TaskManagerEvent, uuid: string): void {
    this.#emitters[event]?.off(uuid)
  }
}
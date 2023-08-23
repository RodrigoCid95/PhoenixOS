import AppDesktopController from "./index"
import { AppModule } from "phoenix-core/types/app"
import { EmittersDriver } from 'phoenix-core/types/drivers/emitter'
import { Manifest, TaskManager } from "phoenix-core/types/task-manager"
import LauncherController from "./launcher"
import LauncherListController from "./launcher/list"
import LauncherSettingsController from "./launcher/settings"
import TaskManagerController from "./task-manager"

type GetModuleOptions = {
  emitters: EmittersDriver
  taskManager: TaskManager
  launch: (manifest: Manifest) => Promise<void>
}

export const getModule = ({ emitters, taskManager, launch }: GetModuleOptions): AppModule => {
  Object.defineProperty(AppDesktopController.prototype, 'taskManager', { value: taskManager, writable: false })
  Object.defineProperty(AppDesktopController.prototype, 'emitters', { value: emitters, writable: false })
  Object.defineProperty(LauncherController.prototype, 'emitters', { value: emitters, writable: false })
  Object.defineProperty(LauncherController.prototype, 'taskManager', { value: taskManager, writable: false })
  Object.defineProperty(LauncherListController.prototype, 'emitters', { value: emitters, writable: false })
  Object.defineProperty(LauncherListController.prototype, 'launch', { value: launch, writable: false })
  Object.defineProperty(LauncherSettingsController.prototype, 'emitters', { value: emitters, writable: false })
  Object.defineProperty(TaskManagerController.prototype, 'taskManager', { value: taskManager, writable: false })
  return {
    Views: {
      prefix: 'desktop',
      Index: AppDesktopController,
      others: {
        launcher: LauncherController,
        'launcher-list': LauncherListController,
        'launcher-settings': LauncherSettingsController,
        'task-manager': TaskManagerController
      }
    }
  }
}
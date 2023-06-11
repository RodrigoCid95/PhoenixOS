import { AppModule } from 'phoenix-builder'
import Index from './views/index'
import AppPageThree from 'views/view-three'

const appModule: AppModule = {
  prefix: 'pt',
  Views: {
    Index,
    others: {
      'two': () => import('views/view-two'),
      'three': AppPageThree
    }
  }
}

export default appModule 
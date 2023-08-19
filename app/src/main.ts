import { AppModule } from 'phoenix-core/types/app'
import Index from './views/index'
import AppPageThree from './views/view-three'

const appModule: AppModule = {
  Views: {
    prefix: 'pt',
    Index,
    others: {
      'two': () => import('./views/view-two'),
      'three': AppPageThree
    },
  },
  Services: {
    IndexService: () => import('./services')
  }
}

export default appModule 
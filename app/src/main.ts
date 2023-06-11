import { AppModule } from 'phoenix-builder'
import Index from './views/index'
import AppPageThree from 'views/view-three'

const appModule: AppModule<'at'> = {
  Views: {
    Index,
    others: {
      'at-page-two': () => import('views/view-two'),
      'at-page-three': AppPageThree
    }
  }
}

export default appModule
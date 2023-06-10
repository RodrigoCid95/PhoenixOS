import { AppModule } from 'phoenix-builder'
import Index from './views/index'

const appModule: AppModule<'at'> = {
  Views: {
    Index,
    others: {
      'at-two': () => import('views/view1')
    }
  }
}

export default appModule
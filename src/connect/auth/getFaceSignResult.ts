import { User } from '@/type/user'
import { createAPIConnector } from '..'
import { userMockModel } from './index.model'

export const getFaceSignResult = createAPIConnector<{}, {}, User>(
  'auth/facesign-result',
  {
    method: 'GET',
    mockHandler: userMockModel.random,
    needAuth: true,
  }
)

import { User, FaceSignResultType } from '@/type/user'
import { createAPIConnector, Doc } from '..'
import { userMockModel } from './index.model'

export const getFaceSignResult = createAPIConnector<
  {},
  {},
  | {
      type: FaceSignResultType.SURE
      user: Doc<User>
      paymentToken: string
    }
  | {
      type: FaceSignResultType.MULTIPLE_POSSIBILITY
      ids: number[]
    }
  | {
      type: FaceSignResultType.FAILED
    }
  | {
      type: FaceSignResultType.PENDING
    }
>('auth/facesign-result', {
  method: 'GET',
  mockHandler() {
    if (Math.random() > 0.5) {
      return {
        type: FaceSignResultType.PENDING,
      }
    }
    if (Math.random() > 0.5) {
      return {
        type: FaceSignResultType.SURE,
        user: userMockModel.random(),
        paymentToken: '뭐시기 저시기 토큰',
      }
    }

    if (Math.random() > 0.5) {
      return {
        type: FaceSignResultType.MULTIPLE_POSSIBILITY,
        ids: [userMockModel.random().id, userMockModel.random().id],
      }
    }

    return {
      type: FaceSignResultType.FAILED,
    }
  },
  needAuth: true,
})

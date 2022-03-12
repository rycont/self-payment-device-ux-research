import { FaceSignResultType, UserWithApprovalToken } from '@/type'
import { createAPIConnector, Doc } from '..'

export const getFaceSignResult = createAPIConnector<
  {},
  {},
  | (UserWithApprovalToken & {
      type: FaceSignResultType.SURE
    })
  | {
      type: FaceSignResultType.MULTIPLE_POSSIBILITY
      ids: number[]
    }
  | {
      type: FaceSignResultType.FAILED
    }
>('auth/facesign-result', {
  method: 'GET',
  mockHandler() {
    if (Math.random() > 0.8) {
      return {
        type: FaceSignResultType.SURE,
        approvalToken: '뭐시기 저시기 토큰',
        user: {
          name: '최재현',
          profileImage: 'https://github.com/rycont.png',
          receivedCoupons: [],
        },
      }
    }

    if (Math.random() > 0.6) {
      return {
        type: FaceSignResultType.MULTIPLE_POSSIBILITY,
        ids: [100, 200, 300],
      }
    }

    return {
      type: FaceSignResultType.FAILED,
    }
  },
  needAuth: true,
})

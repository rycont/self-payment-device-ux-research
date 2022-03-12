import { UserWithApprovalToken } from '@/type'
import { createAPIConnector } from '..'

export const getPinMatchedUser = createAPIConnector<
  {},
  {
    ids: number[]
    pin: string
  },
  | (UserWithApprovalToken & {
      succeed: true
    })
  | {
      succeed: false
    }
>('auth/user-pin-match', {
  method: 'GET',
  needAuth: true,
  mockHandler(url, req) {
    console.log(req)
    if (!req)
      return {
        succeed: false,
      }

    return {
      succeed: true,
      user: {
        name: '최재현',
        profileImage: 'https://github.com/rycont.png',
        receivedCoupons: [],
      },
      approvalToken: '여기에 JWT로 구운 토큰이 들어가겠지 ..',
    }
  },
})

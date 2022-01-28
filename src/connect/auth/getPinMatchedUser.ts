import { User } from '@/type/user'
import { createAPIConnector } from '..'
import { userMockModel } from './index.model'

export const getPinMatchedUser = createAPIConnector<
  {},
  {
    ids: number[]
    pin: string
  },
  | {
      succeed: true
      user: User
      paymentToken: string
    }
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

    const user = userMockModel
      .getAll()
      .find((u) => req?.ids.includes(u.id) && u.hashedPin === btoa(req.pin))

    if (user) {
      return {
        succeed: true,
        user: user,
        paymentToken: '여기에 JWT로 구운 토큰이 들어가겠지 ..',
      }
    }

    return {
      succeed: false,
    }
  },
})

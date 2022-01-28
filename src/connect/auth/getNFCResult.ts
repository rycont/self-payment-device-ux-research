import { User } from '@/type/user'
import { userMockModel } from '.'
import { createAPIConnector } from '..'

export const getNFCResult = createAPIConnector<
  {},
  {},
  | {
      succeed: true
      user: User
      paymentToken: string
    }
  | {
      succeed: false
    }
>('auth/nfc-result', {
  method: 'GET',
  needAuth: true,
  async mockHandler() {
    await new Promise<void>((res) => setTimeout(() => res(), 4000)) // wait 4초
    if (Math.random() > 0.5) {
      return {
        user: userMockModel.random(),
        paymentToken: 'NFC로 찍었네요.. 토큰',
        succeed: true,
      }
    }
    return {
      succeed: false,
    }
  },
})

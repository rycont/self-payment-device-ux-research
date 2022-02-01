import { User, UserWithPaymentToken } from '@/type'
import { userMockModel } from '.'
import { createAPIConnector } from '..'

export const getQRResult = createAPIConnector<
  {},
  {},
  | (UserWithPaymentToken & {
      succeed: true
    })
  | {
      succeed: false
    }
>('auth/QR-result', {
  method: 'GET',
  needAuth: true,
  async mockHandler() {
    await new Promise<void>((res) =>
      setTimeout(() => res(), Math.random() * 5 + 12)
    ) // 12 ~ 17초
    if (Math.random() > 0.5) {
      return {
        user: userMockModel.random(),
        paymentToken: 'QR로 찍었네요.. 토큰',
        succeed: true,
      }
    }
    return {
      succeed: false,
    }
  },
})

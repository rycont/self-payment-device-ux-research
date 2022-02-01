import { User, UserWithPaymentToken } from '@/type'
import { userMockModel } from '.'
import { createAPIConnector } from '..'

export const getSmsVerificationResult = createAPIConnector<
  {},
  {},
  UserWithPaymentToken
>('auth/sms/verify', {
  method: 'GET',
  needAuth: true,
  async mockHandler() {
    await new Promise<void>((res) =>
      setTimeout(() => res(), Math.random() * 5 + 12)
    ) // 12 ~ 17초

    return {
      user: userMockModel.random(),
      paymentToken: '뭐시기머시질ㄴ아ㅗㅓㅏㄴㅇ',
    }
  },
})

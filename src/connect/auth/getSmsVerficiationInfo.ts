import { createAPIConnector } from '..'

export const getSmsVerificationInfo = createAPIConnector<
  {},
  {},
  {
    number: string
    to: string
  }
>('auth/sms/create-otp', {
  method: 'POST',
  needAuth: true,
  mockHandler() {
    return {
      number: Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, '0'),
      to: 'reactdev@kakao.com',
    }
  },
})

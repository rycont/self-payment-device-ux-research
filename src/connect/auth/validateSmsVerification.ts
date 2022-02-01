import { UserWithPaymentToken } from '@/type'
import { userMockModel } from '.'
import { createAPIConnector } from '..'

export const validateSmsVerification = createAPIConnector<
  {},
  {
    studentId: number
    otp: string
  },
  | (UserWithPaymentToken & {
      isValid: true
    })
  | {
      isValid: false
      message: string
    }
>('auth/sms/validate-otp', {
  method: 'POST',
  mockHandler(_, req) {
    if (!req) return { isValid: false, message: '인증번호가 올바르지 않아요' }
    if (req.otp === '1122')
      return {
        user: userMockModel.get('studentId', 'studentId')(req),
        isValid: true,
        paymentToken: '뭐시기저시기.. SMS 인증',
      }
    return {
      isValid: false,
      message: '인증번호가 올바르지 않아요',
    }
  },
  needAuth: true,
})

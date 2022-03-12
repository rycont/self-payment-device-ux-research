import { Coupon, UserWithApprovalToken } from '@/type'
import { userMockModel } from '.'
import { createAPIConnector } from '..'

export const validateSmsVerification = createAPIConnector<
  {},
  {
    studentNumber: number
    smsCode: string
  },
  | ({
      isValid: true
    } & UserWithApprovalToken)
  | {
      isValid: false
      message: string
    }
>('auth/validate-sms-code', {
  method: 'POST',
  mockHandler(_, req) {
    if (!req) return { isValid: false, message: '인증번호가 올바르지 않아요' }
    if (req.smsCode === '1122')
      return {
        isValid: true,
        approvalToken: '뭐시기저시기.. SMS 인증',
        user: {
          name: '최재현',
          profileImage: 'https://github.com/rycont.png',
          receivedCoupons: [
            {
              issuer: {
                name: '아무개',
              },
              name: '경제골든벨 1등',
              amount: 3000,
              id: 2384723,
            },
          ],
        },
      }

    return {
      isValid: false,
      message: '인증번호가 올바르지 않아요',
    }
  },
  needAuth: true,
})

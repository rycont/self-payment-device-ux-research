import { Coupon, UserWithApprovalToken } from '@/type'
import { createAPIConnector } from '../connector'

export const getUserFromApprovalToken = createAPIConnector<
  {},
  {
    approvalToken: string
  },
  UserWithApprovalToken['user']
>('user/approval-token', {
  method: 'POST',
  async mockHandler() {
    return {
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
    }
  },
  needAuth: true,
})

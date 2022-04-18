import { UserWithApprovalToken } from '@/type'
import { createAPIConnector } from '../connector'

export const getUserFromSUID = createAPIConnector<
  {
    suid: string
  },
  {},
  UserWithApprovalToken
>('user/:suid', {
  method: 'POST',
  async mockHandler(param) {
    return {
      '2443': {
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
        approvalToken: 'askdfhsjdfk',
      },
    }[param!.suid]
  },
  needAuth: true,
})

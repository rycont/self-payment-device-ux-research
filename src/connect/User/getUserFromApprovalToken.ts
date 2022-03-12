import { Coupon } from '@/type'
import { createAPIConnector } from '../connector'
import { userMockModel } from './index.model'

export const getUserFromApprovalToken = createAPIConnector<
  {},
  {
    approvalToken: string
  },
  {
    systemId: string
    name: string
    profileImage: string
    studentNumber?: string
    receivedCoupons: Coupon[]
  }
>('user/approval-token', {
  method: 'POST',
  async mockHandler() {
    return userMockModel.random()
  },
  needAuth: true,
})

import { Doc } from '@/connect'
import { Coupon } from './coupon'

// export interface User {
//   studentNumber?: string
//   username: string
//   name: string
//   profileImage: string
//   receivedCoupons: Doc<Coupon>[]
//   systemId: string
//   phoneNumber?: string
// }

export interface UserWithApprovalToken {
  user: {
    receivedCoupons: Doc<Coupon>[]
    name: string
    profileImage: string
  }
  approvalToken: string
}

export enum FaceSignResultType {
  SURE,
  MULTIPLE_POSSIBILITY,
  FAILED,
  PENDING,
}

import { Doc } from '@/connect'
import { Coupon } from './coupon'

export interface User {
  studentId?: number
  username: string
  type: 0 | 1
  name: string
  profileImage: string
  hashedPin: string
  coupon: Doc<Coupon>[]
}

export enum FaceSignResultType {
  SURE,
  MULTIPLE_POSSIBILITY,
  FAILED,
  PENDING,
}

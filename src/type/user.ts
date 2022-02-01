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
  phoneNumber?: string
}

export interface UserWithPaymentToken {
  user: Doc<User>
  paymentToken: string
}

export function isUser(data: any): data is User {
  return (
    data &&
    'username' in data &&
    typeof data.username === 'string' &&
    'type' in data &&
    typeof data.type === 'number' &&
    'name' in data &&
    typeof data.name === 'string' &&
    'profileImage' in data &&
    typeof data.profileImage === 'string' &&
    'hashedPin' in data &&
    typeof data.hashedPin === 'string' &&
    'coupon' in data &&
    Array.isArray(data.coupon)
  )
}

export function isUserWithPaymentToken(
  data: any
): data is UserWithPaymentToken {
  return (
    data &&
    'user' in data &&
    isUser(data.user) &&
    'paymentToken' in data &&
    typeof data.paymentToken === 'string'
  )
}

export enum FaceSignResultType {
  SURE,
  MULTIPLE_POSSIBILITY,
  FAILED,
  PENDING,
}

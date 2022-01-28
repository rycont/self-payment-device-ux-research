import { Coupon, User } from '@/type'
import { createMockModel } from '..'

const couponMockModel = createMockModel<Coupon>('coupon', [
  {
    id: 1234,
    issuer: '하미영 선생님',
    name: '랜선찝기 장인상',
    price: 1000,
  },
  {
    id: 24123,
    issuer: '박성수 선생님',
    name: '요비선 시공 장인상',
    price: 1000,
  },
])

export const userMockModel = createMockModel<User>('user', [
  {
    id: 10101010100,
    studentId: 1,
    type: 0,
    username: 'rycont',
    name: '최재현',
    profileImage: 'https://github.com/rycont.png',
    hashedPin: btoa('1122'),
    coupon: couponMockModel.getAll(),
  },
])

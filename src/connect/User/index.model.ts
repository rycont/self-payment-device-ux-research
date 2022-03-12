import { Coupon } from '@/type'
import { createMockModel } from '..'

const couponMockModel = createMockModel<Coupon>('coupon', [
  {
    id: 1234,
    issuer: {
      name: '하미영 선생님',
    },
    name: '랜선찝기 장인상',
    amount: 1000,
  },
  {
    id: 24123,
    issuer: {
      name: '박성수 선생님',
    },
    name: '요비선 시공 장인상',
    amount: 1000,
  },
])

import { Product, UserWithPaymentToken } from '@/type'
import { createAPIConnector } from '..'

export const requestPayment = createAPIConnector<
  {},
  UserWithPaymentToken & {
    products: number[]
    coupons: number[]
  },
  | {
      succeed: true
    }
  | {
      succeed: false
      message: string
    }
>('payment', {
  method: 'POST',
  mockHandler(_, req) {
    return {
      succeed: false,
      message: '등록된 결제 수단 (KB 개돼지)에 오류가 발생했어요 : 해지카드',
    }
  },
  needAuth: true,
})

import { createAPIConnector } from '../connector'

export const depositPayment = createAPIConnector<
  {},
  {
    products: {
      productId: string
      amount: number
    }[]
  },
  {}
>('payment/approval', {
  method: 'POST',
  mockHandler(urlParams?, reqBody?) {
    return {}
  },
  needAuth: true,
})

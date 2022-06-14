import { createAPIConnector } from '../connector'

export const depositPayment = createAPIConnector<
  {},
  {
    products: {
      productId: string
      amount: number
    }[]
    userIdentity: {
      systemId: string
      paymentMethod: string
      transactionMethod: string
    }
  },
  {}
>('payment/approval', {
  method: 'POST',
  mockHandler(urlParams?, reqBody?) {
    return {}
  },
  needAuth: true,
})

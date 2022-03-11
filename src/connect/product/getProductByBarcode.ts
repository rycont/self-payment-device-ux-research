import { Product } from '@/type'
import { createAPIConnector, Doc } from '..'
import { productMockModel } from './index.model'

export const getProductByBarcode = createAPIConnector<
  {
    barcode: string
  },
  undefined,
  {
    product: Doc<Product>
  }
>('product/:barcode', {
  method: 'GET',
  needAuth: true,
  mockHandler(id) {
    return {
      product: productMockModel.get('barcode', 'barcode')(id),
    }
  },
})

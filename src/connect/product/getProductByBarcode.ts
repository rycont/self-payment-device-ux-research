import { Product } from '@/type/product'
import { createAPIConnector, Doc } from '..'
import { productMockModel } from './index.model'

export const getProductByBarcode = createAPIConnector<
  {
    barcode: string
  },
  undefined,
  Doc<Product>
>('product/:barcode', {
  method: 'GET',
  needAuth: false,
  mockHandler: productMockModel.get('barcode', 'barcode'),
})

import { Product } from '@/type'
import { createAPIConnector, Doc } from '..'
import { productMockModel } from './index.model'

export const getBarcodelessProduct = createAPIConnector<
  {},
  {},
  {
    barcodelessProducts: Doc<Product>[]
  }
>('product/barcodeless', {
  method: 'GET',
  needAuth: true,
  mockHandler() {
    return {
      barcodelessProducts: productMockModel.getAll().filter((e) => !e.barcode),
    }
  },
})

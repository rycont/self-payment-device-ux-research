import { Product } from '@/type'
import { createAPIConnector, Doc } from '..'
import { productMockModel } from './index.model'

export const getBarcodelessProduct = createAPIConnector<{}, {}, Doc<Product>[]>(
  'product/barcodeless',
  {
    method: 'GET',
    needAuth: false,
    mockHandler() {
      return productMockModel.getAll().filter((e) => !e.barcode)
    },
  }
)

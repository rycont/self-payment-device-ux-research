import { Product } from '@/type'
import { createMockModel } from '..'

export const productMockModel = createMockModel<Product>('product', [
  {
    id: 1,
    name: '갈아 만든 배',
    price: 1000,
    barcode: '0001',
  },
  {
    id: 2,
    name: '허니콤보',
    price: 3000,
    barcode: '0002',
  },
  {
    id: 3,
    name: '디트로이트 피자',
    price: 17000,
    barcode: '0003',
  },
  {
    id: 4,
    name: '프라임립',
    price: 4000,
    discountPolicy: {
      percent: 35,
    },
  },
  {
    id: 5,
    name: '초밥',
    price: 1000,
  },
])

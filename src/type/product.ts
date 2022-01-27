export interface Product {
  name: string
  price: number
  barcode?: string
  discountPolicy?: {
    percent?: number
    fixedPrice?: number
  }
}

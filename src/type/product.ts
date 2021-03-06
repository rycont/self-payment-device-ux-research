export interface DiscountPolicy {
  percent?: number
  fixedPrice?: number
}

export interface Product {
  name: string
  price: number
  barcode?: string
  discountPolicy?: DiscountPolicy
}

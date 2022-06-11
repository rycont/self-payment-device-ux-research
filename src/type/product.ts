export interface DiscountPolicy {
  percent?: number
  fixedPrice?: number
}

export interface Product {
  name: string
  sellingPrice: number
  purchaseCost?: number
  barcode?: string
  discountPolicy?: DiscountPolicy
}

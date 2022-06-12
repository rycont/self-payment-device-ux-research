export interface DiscountPolicy {
  percent?: number
  fixedPrice?: number
}

export interface Product {
  systemId: string
  name: string
  sellingPrice: number
  purchaseCost?: number
  barcode?: string
  discountPolicy?: DiscountPolicy
}

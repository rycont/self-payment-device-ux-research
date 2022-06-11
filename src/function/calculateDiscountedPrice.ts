import { DiscountPolicy } from '@/type'

export const calculateDiscountedPrice = (
  sellingPrice: number,
  discountPolicy?: DiscountPolicy
) => {
  if (!discountPolicy) return sellingPrice
  if (discountPolicy.percent)
    return (discountPolicy.percent * sellingPrice) / 100
  if (discountPolicy.fixedPrice) return discountPolicy.fixedPrice
  return sellingPrice
}

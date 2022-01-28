import { DiscountPolicy } from '@/type'

export const calculateDiscountedPrice = (
  price: number,
  discountPolicy?: DiscountPolicy
) => {
  if (!discountPolicy) return price
  if (discountPolicy.percent) return (discountPolicy.percent * price) / 100
  if (discountPolicy.fixedPrice) return discountPolicy.fixedPrice
  return price
}

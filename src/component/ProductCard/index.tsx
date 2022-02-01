import { Description, Hexile, Regular } from '@/component'
import { Doc } from '@/connect'
import { calculateDiscountedPrice } from '@/function'
import { Product } from '@/type'

import { DiscountedPrice, ProductWrapper } from './style'

export const ProductView: React.FC<
  Doc<Product> & {
    onClick?: React.MouseEventHandler<HTMLDivElement>
  }
> = ({ onClick, ...product }) => {
  return (
    <ProductWrapper gap={1} onClick={onClick} y="space">
      <Regular>{product.name}</Regular>
      <Hexile gap={1}>
        {product.discountPolicy ? (
          <>
            <Description>
              {calculateDiscountedPrice(product.price, product.discountPolicy)}
              원
            </Description>
            <DiscountedPrice strike>{product.price}원</DiscountedPrice>
          </>
        ) : (
          <>
            <Description>{product.price}원</Description>
          </>
        )}
      </Hexile>
    </ProductWrapper>
  )
}

export * from './style'

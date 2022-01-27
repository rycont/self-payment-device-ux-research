import { Description, Hexile, Regular } from '@/component'
import { Doc } from '@/connect'
import { Product } from '@/type'

import { DiscountedPrice, ProductWrapper } from './style'

export const ProductView: React.FC<
  Doc<Product> & {
    onClick?: React.MouseEventHandler<HTMLDivElement>
  }
> = ({ onClick, ...product }) => {
  return (
    <ProductWrapper gap={1} onClick={onClick}>
      <Regular>{product.name}</Regular>
      <Hexile gap={1}>
        {product.discountPolicy?.percent ? (
          <>
            <Description>
              {(product.discountPolicy.percent * product.price) / 100}원
            </Description>
            <DiscountedPrice>{product.price}원</DiscountedPrice>
          </>
        ) : product.discountPolicy?.fixedPrice ? (
          <>
            <Description>{product.discountPolicy.fixedPrice}원</Description>
            <DiscountedPrice>{product.price}원</DiscountedPrice>
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

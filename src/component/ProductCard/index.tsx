import { MAIN_ACCENT } from '#/stitches.config'
import { useEffect } from 'react'
import HashLoader from 'react-spinners/HashLoader'

import { Description, Hexile, Regular, Vexile } from '@/component'
import { Doc, getProductById } from '@/connect'
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

interface ProductCardProps {
  id: string
  onClick(product: Doc<Product> | null): void
  onLoad(product: Product): void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  onClick,
  onLoad,
}) => {
  const { data, loaded } = getProductById.useHook({
    productId: id,
  })

  useEffect(() => {
    data && onLoad(data)
  }, [data])

  if (!loaded)
    return (
      <ProductWrapper>
        <Vexile x="center" y="center" filly>
          <HashLoader size={30} color={MAIN_ACCENT} />
        </Vexile>
      </ProductWrapper>
    )

  if (data) return <ProductView {...data} onClick={() => onClick(data)} />

  return (
    <ProductWrapper onClick={() => onClick(null)}>
      <Vexile x="center" y="center" filly>
        <Description>알 수 없는 상품 정보</Description>
      </Vexile>
    </ProductWrapper>
  )
}

export * from './style'

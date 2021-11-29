import { Description, Regular } from '@/atom'
import { getProductById } from '@/connect'
import { Product } from '@/type/product'
import { ProductWrapper } from './style'

const ProductView: React.FC<Product> = (product) => {
  return (
    <ProductWrapper gap={1}>
      <Regular>{product.name}</Regular>
      <Description>{product.price}</Description>
    </ProductWrapper>
  )
}

export const ProductCard: React.FC<{ id: string }> = ({ id }) => {
  const { data } = getProductById.useHook({
    productId: id,
  })

  if (data) return <ProductView {...data} />

  return (
    <ProductWrapper>
      <Description>알 수 없는 상품 정보</Description>
    </ProductWrapper>
  )
}

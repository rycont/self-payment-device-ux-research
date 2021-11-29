import HashLoader from 'react-spinners/HashLoader'
import { Description, Regular, Vexile } from '@/atom'
import { Doc, getProductById } from '@/connect'
import { Product } from '@/type/product'
import { ProductWrapper } from './style'
import { MAIN_ACCENT } from '#/stitches.config'

const ProductView: React.FC<
  Doc<Product> & {
    onClick?: React.MouseEventHandler<HTMLDivElement>
  }
> = ({ onClick, ...product }) => {
  return (
    <ProductWrapper gap={1} onClick={onClick}>
      <Regular>{product.name}</Regular>
      <Description>{product.price}</Description>
    </ProductWrapper>
  )
}

interface ProductCardProps {
  id: string
  onClick(key: string): void
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, onClick }) => {
  const { data, loaded } = getProductById.useHook({
    productId: id,
  })

  console.log(data, loaded)

  if (!loaded)
    return (
      <ProductWrapper>
        <Vexile x="center" y="center" filly>
          <HashLoader size={30} color={MAIN_ACCENT} />
        </Vexile>
      </ProductWrapper>
    )

  if (data) return <ProductView {...data} onClick={() => onClick(data._id)} />

  return (
    <ProductWrapper>
      <Vexile x="center" y="center" filly>
        <Description>알 수 없는 상품 정보</Description>
      </Vexile>
    </ProductWrapper>
  )
}

import { MAIN_ACCENT } from '#/stitches.config'
import { Description, Hexile, Regular, Space, Vexile } from '@/atom'
import { Button } from '@/component/Button'
import { ProductCard, ProductView } from '@/component/ProductCard'
import { ProductWrapper } from '@/component/ProductCard/style'
import { Doc, getProductById } from '@/connect'
import { Product } from '@/type/product'
import { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'
import { PurchaseButton } from './partial'
import { ViewArea } from './style'

function ScanProduct() {
  const [products, setProducts] = useState<Doc<Product>[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addProduct = async (e: KeyboardEvent) => {
    if (isNaN(+e.key)) return

    setIsLoading(() => true)

    const productInfo = await getProductById.request({
      productId: e.key,
    })
    setIsLoading(() => false)
    if (!productInfo) return alert('알 수 없는 상품입니다')
    else setProducts((prev) => [...prev, productInfo])
  }

  useEffect(() => {
    window.addEventListener('keypress', addProduct)
    return () => window.removeEventListener('keypress', addProduct)
  }, [])

  const removeProduct = (index: number) => {
    setProducts((keys) => [...keys.slice(0, index), ...keys.slice(index + 1)])
  }

  return (
    <Vexile fillx filly>
      <ViewArea filly padding={6}>
        <Description>상품을 터치해서 삭제할 수 있어요</Description>
        <Space size={3} />
        <Hexile gap={3} linebreak>
          {products.map((product, index) => (
            <ProductView onClick={() => removeProduct(index)} {...product} />
          ))}
          {isLoading && (
            <ProductWrapper>
              <Vexile x="center" y="center" filly>
                <HashLoader size={30} color={MAIN_ACCENT} />
              </Vexile>
            </ProductWrapper>
          )}
        </Hexile>
      </ViewArea>
      <Hexile>
        <Hexile padding={6} gap={3} fillx>
          <Button>바코드가 없는 상품 등록</Button>
          <Button>전체 취소</Button>
        </Hexile>
        <PurchaseButton
          amount={products.length}
          wholePrice={products.reduce((a, b) => a + b.price, 0)}
        />
      </Hexile>
    </Vexile>
  )
}

export { ScanProduct }

import { MAIN_ACCENT } from '#/stitches.config'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HashLoader } from 'react-spinners'

import {
  Button,
  ProductView,
  ProductWrapper,
  Description,
  Hexile,
  Space,
  Vexile,
  GoBack,
} from '@/component'
import { Doc, getProductById } from '@/connect'
import { Product } from '@/type'

import { NonBarcodeProduct, PurchaseButton } from './partial'
import { ViewArea } from './style'
import { useRecoilState } from 'recoil'
import { cartAtom } from '@/coil'
import { toast } from 'react-toastify'

function ScanProduct() {
  const [products, setProducts] = useRecoilState(cartAtom)
  const [isLoading, setIsLoading] = useState(false)
  const [showNonBarcodeProduct, setShowNonBarcodeProduct] = useState(false)

  const navigate = useNavigate()

  const addProduct = (product: Doc<Product>) => {
    setProducts((registeredProduct) => [...registeredProduct, product])
    setShowNonBarcodeProduct(false)
  }

  const addProductFromKeyboard = async (e: KeyboardEvent) => {
    if (isNaN(+e.key)) return

    setIsLoading(() => true)

    try {
      const productInfo = await getProductById.request({
        productId: e.key,
      })
      if (!productInfo) throw new Error()
      else setProducts((prev) => [...prev, productInfo])
    } catch (e) {
      if (e) toast.error('등록되지 않은 상품 정보입니다')
    }

    setIsLoading(() => false)
  }

  useEffect(() => {
    window.addEventListener('keypress', addProductFromKeyboard)
    return () => window.removeEventListener('keypress', addProductFromKeyboard)
  }, [])

  const removeProduct = (index: number) => {
    setProducts((keys) => [...keys.slice(0, index), ...keys.slice(index + 1)])
  }

  const goToPurchasePage = () => {
    setProducts(products)
    navigate('/facesign')
  }

  const removeAll = () => {
    setProducts(() => [])
  }

  const toggleNonBarcodeProduct = () => {
    setShowNonBarcodeProduct((e) => !e)
  }

  return (
    <Vexile fillx filly>
      <ViewArea filly padding={6}>
        <Description>상품을 터치해서 삭제할 수 있어요</Description>
        <Space size={3} />
        <Hexile gap={3} linebreak>
          {products.map((product, index) => (
            <ProductView
              key={product._id}
              onClick={() => removeProduct(index)}
              {...product}
            />
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
      <Hexile relative>
        {showNonBarcodeProduct && (
          <NonBarcodeProduct selectProduct={addProduct} />
        )}
        <Vexile fillx padding={6} gap={3}>
          <GoBack />
          <Hexile gap={3} fillx>
            <Button onClick={toggleNonBarcodeProduct}>
              바코드가 없는 상품 등록
            </Button>
            <Button onClick={removeAll}>전체 취소</Button>
          </Hexile>
        </Vexile>
        <PurchaseButton
          onClick={goToPurchasePage}
          amount={products.length}
          wholePrice={products.reduce((a, b) => a + b.price, 0)}
        />
      </Hexile>
    </Vexile>
  )
}

export { ScanProduct }

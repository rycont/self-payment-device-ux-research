import { MAIN_ACCENT } from '#/stitches.config'
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

import { NonBarcodeProduct, PurchaseButton } from './partial'
import { ViewArea } from './style'
import { useLogics } from './logic'

function ScanProduct() {
  const logics = useLogics()

  return (
    <Vexile fillx filly>
      <ViewArea filly padding={6}>
        <Description>상품을 터치해서 삭제할 수 있어요</Description>
        <Space size={3} />
        <Hexile gap={3} linebreak>
          {logics.products.map((product, index) => (
            <ProductView
              key={product._id}
              onClick={() => logics.removeProduct(index)}
              {...product}
            />
          ))}
          {logics.isLoading && (
            <ProductWrapper>
              <Vexile x="center" y="center" filly>
                <HashLoader size={30} color={MAIN_ACCENT} />
              </Vexile>
            </ProductWrapper>
          )}
        </Hexile>
      </ViewArea>
      <Hexile relative>
        {logics.showNonBarcodeProduct && (
          <NonBarcodeProduct selectProduct={logics.addProduct} />
        )}
        <Vexile fillx padding={6} gap={3}>
          <GoBack />
          <Hexile gap={3} fillx>
            <Button onClick={logics.toggleNonBarcodeProduct}>
              바코드가 없는 상품 등록
            </Button>
            <Button onClick={logics.removeAll}>전체 취소</Button>
          </Hexile>
        </Vexile>
        <PurchaseButton
          onClick={logics.goToPurchasePage}
          amount={logics.products.length}
          wholePrice={logics.products.reduce((a, b) => a + b.price, 0)}
        />
      </Hexile>
    </Vexile>
  )
}

export { ScanProduct }

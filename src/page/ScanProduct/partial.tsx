import { Hexile, ProductView, RegularImportant } from '@/component'
import { Doc, getBarcodelessProduct } from '@/connect'
import { Product } from '@/type'
import { NonBarcodeProductWrapper } from './style'

export const NonBarcodeProduct: React.FC<{
  selectProduct(selected: Doc<Product>): void
}> = (props) => {
  // const { data } = getBarcodelessProduct.useHook()
  return (
    <NonBarcodeProductWrapper padding={6} gap={4}>
      {/* <RegularImportant>추가할 물건을 선택해주세요</RegularImportant>
      <Hexile gap={3}>
        {data &&
          data.barcodelessProducts.map((d) => (
            <ProductView {...d} onClick={() => props.selectProduct(d)} />
          ))}
      </Hexile> */}
    </NonBarcodeProductWrapper>
  )
}

import {
  Description,
  ProductCard,
  ProductView,
  RegularImportant,
  SectionHeader,
} from '@/component'
import { Doc, getBarcodelessProduct } from '@/connect'
import { Product } from '@/type'
import { NonBarcodeProductWrapper, PurchaseButtonWrapper } from './style'

export const PurchaseButton: React.FC<{
  wholePrice: number
  amount: number
  onClick(): void
}> = (props) => {
  return (
    <PurchaseButtonWrapper
      disabled={!props.amount}
      keepsize
      gap={1}
      paddingx={5}
      paddingy={3}
      y="center"
      onClick={() => props.onClick()}
    >
      <Description>{props.amount}개 상품</Description>
      <SectionHeader notight>
        {props.wholePrice.toLocaleString()}원 결제
      </SectionHeader>
    </PurchaseButtonWrapper>
  )
}

export const NonBarcodeProduct: React.FC<{
  selectProduct(selected: Doc<Product>): void
}> = (props) => {
  const { data } = getBarcodelessProduct.useHook()
  return (
    <NonBarcodeProductWrapper padding={6} gap={4}>
      <RegularImportant>추가할 물건을 선택해주세요</RegularImportant>
      {data?.map((d) => (
        <ProductView {...d} onClick={() => props.selectProduct(d)} />
      ))}
    </NonBarcodeProductWrapper>
  )
}

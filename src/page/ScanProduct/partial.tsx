import {
  Description,
  DescriptionImportant,
  PageHeader,
  Regular,
  SectionHeader,
  Vexile,
} from '@/atom'
import { PurchaseButtonWrapper } from './style'

export const PurchaseButton: React.FC<{
  wholePrice: number
  amount: number
}> = (props) => {
  return (
    <PurchaseButtonWrapper
      keepsize
      gap={1}
      paddingx={5}
      paddingy={3}
      y="center"
    >
      <Description>{props.amount}개 상품</Description>
      <SectionHeader notight>
        {props.wholePrice.toLocaleString()}원 결제
      </SectionHeader>
    </PurchaseButtonWrapper>
  )
}

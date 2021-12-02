import { Description, SectionHeader } from '@/component'
import { PurchaseButtonWrapper } from './style'

export const PurchaseButton: React.FC<{
  wholePrice: number
  amount: number
  onClick(): void
}> = (props) => {
  return (
    <PurchaseButtonWrapper
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

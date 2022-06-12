import {
  Vexile,
  SectionHeader,
  Description,
  PageHeader,
  GoBack,
  Callout,
} from '@/component'
import { cartSumSelector, tossQRAtom } from '@/coil'
import { useRecoilValue } from 'recoil'

export const ManualPayment = () => {
  const totalPrice = useRecoilValue(cartSumSelector)
  const qr = useRecoilValue(tossQRAtom)

  return (
    <Vexile x="center" y="center" filly gap={6}>
      <Vexile gap={2}>
        <SectionHeader center>
          QR코드를 스캔해서 <br></br>
          결제를 진행해주세요
        </SectionHeader>
        <Description>계좌 송금으로 결제가 진행됩니다.</Description>
      </Vexile>
      <Vexile gap={2} x="center">
        {qr && <img style={{ width: '30rem' }} src={qr} />}
        <PageHeader accent>{totalPrice}원</PageHeader>
      </Vexile>
      <Callout>
        <Description center>
          아직 행정적 절차의 문제로 계좌이체 결제만 가능합니다
        </Description>
        <Description center>
          추후 업데이트를 통해 문자인증 결제가 제공될 예정입니다
        </Description>
      </Callout>
      <GoBack />
    </Vexile>
  )
}

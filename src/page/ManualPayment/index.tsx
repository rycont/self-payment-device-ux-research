import {
  Vexile,
  SectionHeader,
  Description,
  PageHeader,
  GoBack,
  Callout,
} from '@/component'
import { cartSumSelector, tossQRAtom } from '@/coil'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { useHIDInput } from '@/hook'
import { ROUTES } from '@/constants'

export const ManualPayment = () => {
  const totalPrice = useRecoilValue(cartSumSelector)
  const qr = useRecoilValue(tossQRAtom)
  const goto = useNavigate()

  useHIDInput({
    async onData(data) {
      if (data === 'EDH2') {
        {
          goto(ROUTES.REQUEST_PAYMENT, {
            state: {
              succeed: true,
            },
          })
        }
      }
    },
    isNonNumericAllowed: true,
  })

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
          관리자의 송금 확인이 있기 전 까지 기다려주세요
        </Description>
      </Callout>
      <GoBack>결제 취소</GoBack>
    </Vexile>
  )
}

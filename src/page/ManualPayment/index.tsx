import {
  Vexile,
  SectionHeader,
  Description,
  PageHeader,
  GoBack,
  Callout,
} from '@/component'
import { cartAtom, cartSumSelector, posAuthTokenAtom, tossQRAtom } from '@/coil'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { ROUTES } from '@/constants'
import { useEffect } from 'react'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { getRecoil } from 'recoil-nexus'
import { toast } from 'react-toastify'
import { depositPayment } from '@/connect/payment/deposit'

export const ManualPayment = () => {
  const totalPrice = useRecoilValue(cartSumSelector)
  const products = useRecoilValue(cartAtom)
  const qr = useRecoilValue(tossQRAtom)
  const goto = useNavigate()
  const auth = useRecoilValue(posAuthTokenAtom)

  useEffect(() => {
    ;(async () => {
      if (!auth) {
        toast.error('단말기를 사용할 수 없어요')
        return
      }

      const productsCount = Object.entries(
        products.reduce(
          (matched, current) => {
            return {
              ...matched,
              [current.systemId]: (matched[current.systemId] || 0) + 1,
            }
          },
          {} as {
            [key: string]: number
          }
        )
      ).map((e) => ({
        productId: e[0],
        amount: e[1],
      }))
      console.log

      await depositPayment.request(
        {},
        {
          products: productsCount,
        },
        'text'
      )

      const sse = new EventSourcePolyfill(
        'https://dimipay-api.rycont.ninja/payment/deposit',
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )

      sse.addEventListener('message', (e) => {
        const payload = JSON.parse(e.data as string)
        console.log(payload)
        // if (payload.status === 'SUCCESS')
        //   goto(ROUTES.REQUEST_PAYMENT, {
        //     state: {
        //       succeed: true,
        //     },
        //   })
      })
    })()
  }, [auth, products, goto])

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

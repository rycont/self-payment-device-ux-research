import { useNavigate } from 'react-router'
import { success } from '@/asset'
import { Lottie, PageHeader, Vexile } from '@/component'
import { API_URI, isDev, ROUTES } from '@/constants'
import { useEffect } from 'react'
import { cartAtom } from '@/coil'
import { depositPayment } from '@/connect/payment/deposit'
import { useRecoilValue } from 'recoil'

export const RequestPayment = () => {
  const products = useRecoilValue(cartAtom)
  const goto = useNavigate()

  useEffect(() => {
    ;(async () => {
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

      let succeed = null
      let error = ''

      try {
        if (
          (await depositPayment.request(
            {},
            {
              products: productsCount,
              userIdentity: {
                systemId: import.meta.env.VITE_TEMPORAL_USER_SUID,
                paymentMethod: import.meta.env.VITE_TEMPORAL_PAYMENT_METHOD,
                transactionMethod: 'APP_QR',
              },
            },
            {
              type: 'text',
            }
          )) === 'ok'
        ) {
          succeed = true
        } else {
          throw new Error()
        }
      } catch (e) {
        succeed = false
        if (e instanceof Error) error = e.name + ' / ' + e.message
        else if ((e as any).toString instanceof Function)
          error = (e as any).toString()
      }

      const form = JSON.stringify({
        succeed: succeed.toString(),
        products: JSON.stringify(productsCount),
        'form-name': 'request-payment',
        target: API_URI,
        date: new Date().toISOString(),
      })

      localStorage.setItem('PAYMENT/' + new Date().toISOString(), form)

      // await fetch('/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      //   body: form,
      // })
    })()
  }, [])

  // if (prevState.succeed)
  //   return (
  //     <Vexile fillx filly x="center" y="center">
  //       <HashLoader size={30} color={MAIN_ACCENT} />
  //     </Vexile>
  //   )

  // if (prevState?.succeed)
  return (
    <Vexile fillx filly x="center" y="center" gap={4}>
      <Lottie
        width={40}
        height={40}
        speed={0.7}
        loop={false}
        animate={success}
        autoReverse
        onFinish={() => goto(ROUTES.ROOT)}
      />
      <PageHeader>결제가 완료되었습니다</PageHeader>
    </Vexile>
  )

  // return (
  //   <Vexile fillx filly x="center" y="center" gap={4}>
  //     <Lottie
  //       width={40}
  //       height={40}
  //       speed={1.8}
  //       loop={false}
  //       animate={failed}
  //       onFinish={() => {}}
  //     />
  //     <Vexile gap={2} x="center">
  //       <PageHeader>결제에 실패했어요</PageHeader>
  //       <Description>
  //         결제 가능한 시간이 지났어요. 100초 이내에 결제를 마무리 해주세요.
  //       </Description>
  //     </Vexile>
  //     <GoBack />
  //   </Vexile>
  // )
}

import { useNavigate } from 'react-router'
import { failed, success } from '@/asset'
import { Description, GoBack, Lottie, PageHeader, Vexile } from '@/component'
import { ROUTES } from '@/constants'
import { useRecoilValue } from 'recoil'
import { cartAtom, currentUserAtom, selectedCouponIdsAtom } from '@/coil'
import { requestPayment } from '@/connect'
import { isUserWithPaymentToken, UserWithPaymentToken } from '@/type'
import { useEffect } from 'react'
import { MAIN_ACCENT } from '#/stitches.config'
import { HashLoader } from 'react-spinners'

export const RequestPayment = () => {
  const user = useRecoilValue(currentUserAtom)
  const cart = useRecoilValue(cartAtom)
  const coupons = useRecoilValue(selectedCouponIdsAtom)
  const goto = useNavigate()

  useEffect(() => {
    if (!isUserWithPaymentToken(user)) {
      goto(ROUTES.ROOT)
    }
  }, [])

  const { data, loaded } = requestPayment.useHook(
    {},
    {
      ...(user as UserWithPaymentToken),
      coupons,
      products: cart.map(({ id }) => id),
    }
  )

  if (!loaded || !data)
    return (
      <Vexile fillx filly x="center" y="center">
        <HashLoader size={30} color={MAIN_ACCENT} />
      </Vexile>
    )

  if (data?.succeed)
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

  return (
    <Vexile fillx filly x="center" y="center" gap={4}>
      <Lottie
        width={40}
        height={40}
        speed={1.8}
        loop={false}
        animate={failed}
        onFinish={() => {}}
      />
      <Vexile gap={2} x="center">
        <PageHeader>결제에 실패했어요</PageHeader>
        <Description>{data.message}</Description>
      </Vexile>
      <GoBack />
    </Vexile>
  )
}

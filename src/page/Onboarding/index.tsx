import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import { verticalLogo } from '@/asset'
import {
  cartAtom,
  currentUserAtom,
  posAuthTokenAtom,
  selectedCouponIdsAtom,
} from '@/coil'
import { DescriptionImportant, PlainLink, Regular, Vexile } from '@/component'
import { ROUTES } from '@/constants'
import { useHIDInput } from '@/hook'
import { MainLogo } from './style'

function Onboarding() {
  const goto = useNavigate()
  const resetCart = useResetRecoilState(cartAtom)
  const resetUser = useResetRecoilState(currentUserAtom)
  const resetCoupon = useResetRecoilState(selectedCouponIdsAtom)
  const userToken = useRecoilValue(posAuthTokenAtom)

  const [clickCount, setClickCount] = useState(0)

  useHIDInput({
    onData(e) {
      goto(ROUTES.SCAN_PRODUCT, {
        state: {
          init: e,
        },
      })
    },
  })

  useEffect(() => {
    if (clickCount === 5) {
      goto(ROUTES.CUSTOMER_VIEWER)
    }
  }, [clickCount])

  useEffect(() => {
    if (!userToken) goto(ROUTES.POS_AUTH)

    resetCart()
    resetUser()
    resetCoupon()

    const handler = () => setClickCount((e) => e + 1)
    window.addEventListener('click', handler)

    return () => {
      window.removeEventListener('click', handler)
    }
  }, [])

  return (
    <Vexile fillx filly x="center" y="center" gap={12}>
      <MainLogo
        src={verticalLogo}
        alt="디미페이 로고"
        onClick={() => goto(ROUTES.SCAN_PRODUCT)}
      />
      <Vexile x="center" gap={2}>
        <Regular>물건의 바코드를 스캔해서 결제를 시작해주세요</Regular>
        <PlainLink to={ROUTES.SCAN_PRODUCT}>
          <DescriptionImportant accent>
            물건에 바코드가 없나요?
          </DescriptionImportant>
        </PlainLink>
      </Vexile>
    </Vexile>
  )
}

export { Onboarding }

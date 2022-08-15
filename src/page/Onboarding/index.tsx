import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import { verticalLogo } from '@/asset'
import { cartAtom, currentUserAtom, selectedCouponIdsAtom } from '@/coil'
import { Description, DescriptionImportant, Hexile, PlainLink, Regular, Vexile } from '@/component'
import { ROUTES } from '@/constants'
import { useHIDInput } from '@/hook'
import { ConnectInfo, MainLogo, Status } from './style'
import { toast } from 'react-toastify'
import { lstore } from '@/function'

function Onboarding() {
  const goto = useNavigate()
  const resetCart = useResetRecoilState(cartAtom)
  const resetUser = useResetRecoilState(currentUserAtom)
  const resetCoupon = useResetRecoilState(selectedCouponIdsAtom)
  const name = lstore.load("POS_NAME")

  const [internetStatus, setInternetStatus] = useState<boolean>(navigator.onLine);

  useHIDInput({
    isNonNumericAllowed: true,
    onData(e) {

      goto(ROUTES.SCAN_PRODUCT, {
        state: {
          init: e,
        },
      })
    },
  })

  const statusChange = () => setInternetStatus(navigator.onLine);

  useEffect(() => {
    const userToken = lstore.load('ACCESS_TOKEN')
    if (!userToken) goto(ROUTES.POS_AUTH)

    resetCart()
    resetUser()
    resetCoupon()

    window.addEventListener("online", statusChange);
    window.addEventListener("offline", statusChange);
    return () => {
      window.removeEventListener("online", statusChange);
      window.removeEventListener("offline", statusChange);
    }
  }, [])

  return (
    <Vexile fillx filly x="center" y="center" gap={12}>
      <ConnectInfo x='right' gap={2}>
        <Hexile filly y='center' gap={2}>
          <Description>{name} 연결됨</Description>
          <Status connect />
        </Hexile>
        <Hexile filly y='center' gap={2}>
          <Description>인터넷 연결{internetStatus ? '됨' : ' 유실됨'}</Description>
          <Status connect={internetStatus} />
        </Hexile>
      </ConnectInfo>
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

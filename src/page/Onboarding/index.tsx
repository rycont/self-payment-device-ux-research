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
import { toast } from 'react-toastify'

function Onboarding() {
  const goto = useNavigate()
  const resetCart = useResetRecoilState(cartAtom)
  const resetUser = useResetRecoilState(currentUserAtom)
  const resetCoupon = useResetRecoilState(selectedCouponIdsAtom)
  const userToken = useRecoilValue(posAuthTokenAtom)

  useHIDInput({
    isNonNumericAllowed: true,
    onData(e) {
      if (e === 'UPDATE') {
        window.location.reload()
        return
      } else if (e === 'THANKS') {
        toast.info(
          'Initialy made by Electrochemistry, Rycont, Cokia, Uglyonlytoday, dhalsdyd'
        )
        setTimeout(() => {
          toast.success('Special Thanks to')
          toast.success('🧑‍🎨Yeonplue')
          toast.success('🦐Coupy')
          toast.success('💱19기 이비즈니스과 오예빈 학생')
        }, 1000)

        setTimeout(() => {
          toast.info('디미페이가 엄랭보다 큰 업적이 되기를 바랍니다 By Rycont')
          toast.info('포스 드래그 막아줘 By Electrochemistry')
        }, 2000)
        return
      }

      goto(ROUTES.SCAN_PRODUCT, {
        state: {
          init: e,
        },
      })
    },
  })

  useEffect(() => {
    if (!userToken) goto(ROUTES.POS_AUTH)

    resetCart()
    resetUser()
    resetCoupon()
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

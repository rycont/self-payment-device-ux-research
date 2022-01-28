import {
  currentUserAtom,
  modalAppearanceAtom,
  modalContentAtom,
  selectedCouponIdsAtom,
} from '@/coil'
import {
  Button,
  Description,
  Hexile,
  PageHeader,
  RegularImportant,
  Vexile,
} from '@/component'
import { ROUTES } from '@/constants'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CouponSelector, CouponView } from './partial'
import { UserProfileImage } from './style'

export const UserRecognized = () => {
  const goto = useNavigate()
  const user = useRecoilValue(currentUserAtom)?.user
  const showModal = useRecoilState(modalContentAtom)[1]
  const closeModal = useRecoilState(modalAppearanceAtom)[1]

  const gotoPaymentPage = () => {
    closeModal(true)
    void setTimeout(() => goto(ROUTES.PAYMENT_SUCCEED), 1000)
  }

  useEffect(() => {
    if (!user) {
      return goto(ROUTES.ROOT)
    }

    if (user.coupon.length === 0) return gotoPaymentPage()

    setTimeout(
      () =>
        showModal({
          content: (
            <CouponSelector
              coupons={user.coupon}
              onSubmit={() => {
                gotoPaymentPage()
              }}
            />
          ),
          dismissable: true,
          onClose: gotoPaymentPage,
        }),
      1000
    )
  }, [])

  return (
    <Vexile filly fillx x="center" y="center" gap={4}>
      <UserProfileImage src={user?.profileImage} />
      <PageHeader>{user?.name}</PageHeader>
    </Vexile>
  )
}

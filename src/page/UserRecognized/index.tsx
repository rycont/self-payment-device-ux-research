import { useRecoilState, useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { currentUserAtom, modalAppearanceAtom, modalContentAtom } from '@/coil'
import { PageHeader, Vexile } from '@/component'
import { ROUTES } from '@/constants'
import { CouponSelector } from './partial'
import { UserProfileImage } from './style'

export const UserRecognized = () => {
  const goto = useNavigate()
  const user = useRecoilValue(currentUserAtom)?.user
  const showModal = useRecoilState(modalContentAtom)[1]
  const closeModal = useRecoilState(modalAppearanceAtom)[1]

  const gotoPaymentPage = () => {
    closeModal(true)
    void setTimeout(() => goto(ROUTES.REQUEST_PAYMENT), 1000)
  }

  useEffect(() => {
    if (!user) {
      return goto(ROUTES.ROOT)
    }

    if (user.receivedCoupons.length === 0) return gotoPaymentPage()

    setTimeout(
      () =>
        showModal({
          content: (
            <CouponSelector
              coupons={user.receivedCoupons}
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

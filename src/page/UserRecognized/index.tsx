import { currentUserAtom, modalContentAtom } from '@/coil'
import { PageHeader, RegularImportant, Vexile } from '@/component'
import { ROUTES } from '@/constants'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CouponView } from './partial'
import { UserProfileImage } from './style'

export const UserRecognized = () => {
  const goto = useNavigate()
  const user = useRecoilValue(currentUserAtom)?.user
  const showModal = useRecoilState(modalContentAtom)[1]

  const gotoPaymentPage = () =>
    void setTimeout(() => goto(ROUTES.PAYMENT_SUCCEED), 1000)

  useEffect(() => {
    if (!user) {
      return goto(ROUTES.ROOT)
    }

    if (user.coupon.length === 0) return gotoPaymentPage()

    setTimeout(
      () =>
        showModal({
          content: (
            <Vexile gap={4}>
              <RegularImportant>쿠폰을 사용하시겠어요?</RegularImportant>
              <Vexile gap={2}>
                {user.coupon.map((e) => (
                  <CouponView {...e} key={e.id} />
                ))}
              </Vexile>
            </Vexile>
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

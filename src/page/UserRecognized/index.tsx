import { currentUserAtom } from '@/coil'
import { PageHeader, Vexile } from '@/component'
import { ROUTES } from '@/constants'
import { User } from '@/type/user'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useRecoilValue } from 'recoil'
import { UserProfileImage } from './style'

export const UserRecognized = () => {
  const goto = useNavigate()
  const user = useRecoilValue(currentUserAtom)?.user

  useEffect(() => {
    if (!user) {
      return goto(ROUTES.ROOT)
    } else setTimeout(() => goto(ROUTES.PAYMENT_SUCCEED), 1000)
  }, [])

  return (
    <Vexile filly fillx x="center" y="center" gap={4}>
      <UserProfileImage src={user?.profileImage} />
      <PageHeader>{user?.name}</PageHeader>
    </Vexile>
  )
}

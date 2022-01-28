import { PageHeader, Vexile } from '@/component'
import { ROUTES } from '@/constants'
import { User } from '@/type/user'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { UserProfileImage } from './style'

export const UserRecognized = () => {
  const nagivate = useNavigate()
  const user: User = useLocation().state.user

  useEffect(() => {
    setTimeout(() => nagivate(ROUTES.PAYMENT_SUCCEED), 1000)
  }, [])

  return (
    <Vexile filly fillx x="center" y="center" gap={4}>
      <UserProfileImage src={user.profileImage} />
      <PageHeader>{user.name}</PageHeader>
    </Vexile>
  )
}

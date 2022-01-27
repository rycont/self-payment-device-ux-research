import { PageHeader, Vexile } from '@/component'
import { ROUTES } from '@/constants'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { UserProfileImage } from './style'

export const UserRecognized = () => {
  const nagivate = useNavigate()

  useEffect(() => {
    setTimeout(() => nagivate(ROUTES.PAYMENT_SUCCEED), 1000)
  }, [])

  return (
    <Vexile filly fillx x="center" y="center" gap={4}>
      <UserProfileImage src="https://github.com/rycont.png" />
      <PageHeader>정한</PageHeader>
    </Vexile>
  )
}

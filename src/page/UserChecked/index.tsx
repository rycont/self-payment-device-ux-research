import { PageHeader, Vexile } from '@/component'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { UserProfileImage } from './style'

export const UserChecked = () => {
  const nagivate = useNavigate()

  useEffect(() => {
    setTimeout(() => nagivate('/success'), 1000)
  }, [])

  return (
    <Vexile filly fillx x="center" y="center" gap={4}>
      <UserProfileImage src="https://pbs.twimg.com/profile_images/1434171110682075143/SIOg-mTq_400x400.jpg" />
      <PageHeader>정한</PageHeader>
    </Vexile>
  )
}

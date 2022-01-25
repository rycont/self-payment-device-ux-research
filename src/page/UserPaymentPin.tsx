import { Pin } from '@/component/Pin'
import { useNavigate } from 'react-router-dom'

export const UserPaymentPin = () => {
  const goto = useNavigate()
  return (
    <Pin
      title="결제 비밀번호 입력"
      onCancel={() => goto('/scan-product')}
      onSubmit={() => {}}
    />
  )
}

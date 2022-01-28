import { Pin } from '@/component/Pin'
import { ROUTES } from '@/constants'
import { useNavigate } from 'react-router-dom'

export const PaymentPinPrompt = () => {
  const goto = useNavigate()
  return (
    <Pin
      title="결제 비밀번호 입력"
      onCancel={() => goto(ROUTES.SCAN_PRODUCT)}
      onSubmit={() => {}}
    />
  )
}

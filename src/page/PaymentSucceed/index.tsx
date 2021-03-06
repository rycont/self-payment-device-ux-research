import { success } from '@/asset'
import { Lottie, PageHeader, Vexile } from '@/component'
import { useNavigate } from 'react-router'

export const PaymentSucceed = () => {
  const goto = useNavigate()
  return (
    <Vexile fillx filly x="center" y="center" gap={4}>
      <Lottie
        width={40}
        height={40}
        speed={0.7}
        loop={false}
        animate={success}
        autoReverse
        onFinish={() => goto('/')}
      />
      <PageHeader>결제가 완료되었습니다</PageHeader>
    </Vexile>
  )
}

import { Pin } from '@/component/Pin'
import { getPinMatchedUser } from '@/connect'
import { ROUTES } from '@/constants'
import { useLocation, useNavigate } from 'react-router-dom'

export const PaymentPinPrompt = () => {
  const goto = useNavigate()
  const ids = useLocation().state.ids

  console.log('어쩔티비야')

  return (
    <Pin
      title="결제 비밀번호 입력"
      onCancel={() => goto(ROUTES.SCAN_PRODUCT)}
      onSubmit={async (pin) => {
        const result = await getPinMatchedUser.request(
          {},
          {
            ids,
            pin,
          }
        )

        if (result?.succeed) {
          goto(ROUTES.PAYMENT_SUCCEED)
        } else {
          return false
        }
      }}
    />
  )
}

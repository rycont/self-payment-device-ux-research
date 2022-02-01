import { currentUserAtom } from '@/coil'
import { Pin } from '@/component/Pin'
import { getPinMatchedUser } from '@/connect'
import { ROUTES } from '@/constants'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'

export const PaymentPinPrompt = () => {
  const goto = useNavigate()
  const ids = useLocation().state?.ids
  const setUser = useRecoilState(currentUserAtom)[1]

  useEffect(() => {
    if (!ids) goto(ROUTES.ROOT)
  }, [])

  return (
    <Pin
      title="결제 비밀번호 입력"
      onSubmit={async (pin) => {
        const result = await getPinMatchedUser.request(
          {},
          {
            ids,
            pin,
          }
        )

        if (result?.succeed) {
          setUser(result)
          goto(ROUTES.USER_RECOGNIZED)
        } else {
          toast('PIN이 일치하지 않아요')
          return false
        }
      }}
    />
  )
}

import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

import { getPinMatchedUser } from '@/connect'
import { currentUserAtom } from '@/coil'
import { Pin } from '@/component/Pin'
import { ROUTES } from '@/constants'

export const PaymentPinPrompt = () => {
  const goto = useNavigate()
  const ids = (useLocation().state as any)?.ids
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

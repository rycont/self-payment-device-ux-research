import { Pin } from '@/component'
import { loginWithPasscode } from '@/connect'
import { ROUTES } from '@/constants'
import { lstore } from '@/function'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'

export const PosAuth = () => {
  const goto = useNavigate()

  return (
    <Pin
      onSubmit={async (passcode) => {
        const res = await loginWithPasscode.request(
          {},
          {
            passcode,
          }
        )

        if (!res) {
          toast.error('인증에 실패했어요')
          return false
        }

        lstore.save('ACCESS_TOKEN', res.accessToken)
        lstore.save('REFRESH_TOKEN', res.refreshToken)
        goto(ROUTES.ROOT)
      }}
      title="포스 활성화 인증번호"
      description="관리자 페이지에서 인증번호를 발급할 수 있어요"
    />
  )
}

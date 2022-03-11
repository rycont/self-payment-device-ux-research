import { posAuthTokenAtom } from '@/coil'
import { Pin } from '@/component'
import { loginWithPasscode } from '@/connect'
import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'

export const PosAuth = () => {
  const setPosAuthToken = useSetRecoilState(posAuthTokenAtom)
  return (
    <Pin
      onSubmit={async (passcode) => {
        const res = await loginWithPasscode.request(
          {},
          {
            passcode,
          }
        )

        console.log(res)

        if (!res) {
          toast.error('인증에 실패했어요')
          return false
        }

        setPosAuthToken(res)
        return true
      }}
      title="포스 활성화 인증번호"
      description="관리자 페이지에서 인증번호를 발급할 수 있어요"
    />
  )
}

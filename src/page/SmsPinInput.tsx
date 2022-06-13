import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Pin } from '@/component/Pin'
import { ROUTES } from '@/constants'
import { requestSmsVerification } from '@/connect'

export const SmsPinInput = () => {
  const goto = useNavigate()
  const location = useLocation()

  return (
    <Pin
      title="결제비밀번호"
      description="결제비밀번호를 입력해주세요"
      disableScramble
      onSubmit={async (pin) => {
        const res = await requestSmsVerification.request(
          {},
          {
            pin,
            studentNumber: (location.state as any).serial,
          }
        )

        if (!res?.isValid) {
          toast.error('인증번호를 전송하지 못했어요. ' + res?.message)
          return
        }

        toast.success('인증번호를 전송했어요')
        goto(ROUTES.SMS_VERIFICATION_PROMPT, {
          state: { ...res, ...(location.state as any) },
        })
        // goto(ROUTES.SMS_VERIFICATION_PIN_INPUT, {
        //   state: {
        //     serial,
        //   },
        // })
      }}
    />
  )
}

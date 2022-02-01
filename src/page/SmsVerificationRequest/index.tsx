import { Pin } from '@/component/Pin'
import { requestSmsVerification } from '@/connect'
import { ROUTES } from '@/constants'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const SmsVerificationRequest = () => {
  const goto = useNavigate()

  return (
    <Pin
      title="학번 입력"
      description="디미페이에 등록된 휴대폰 번호로 인증번호를 보냅니다"
      disableScramble
      onSubmit={async (pin) => {
        if (!/[1-3][1-6][0-3][0-9]/.test(pin)) {
          toast('학번 형식이 올바르지 않아요')
          return false
        }

        try {
          const res = await requestSmsVerification.request(
            {},
            {
              studentId: +pin,
            }
          )

          if (!res || !res.isValid) {
            throw new Error(res?.message)
          }

          toast('인증번호가 발송됐어요', {
            type: 'success',
          })

          goto(ROUTES.SMS_VERIFICATION_PROMPT, {
            state: {
              maskedPhoneNumber: res.maskedPhoneNumber,
              timelimit: res.timeLimitSeconds,
              studentId: +pin,
            },
          })
        } catch (e) {
          toast((e as Error)?.message || '인증번호 요청에 실패했어요', {
            type: 'error',
          })

          return false
        }
      }}
    />
  )
}

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Pin } from '@/component/Pin'
import { ROUTES } from '@/constants'

export const SmsSerialInput = () => {
  const goto = useNavigate()

  return (
    <Pin
      title="학번 입력"
      description="디미페이에 등록된 휴대폰 번호로 인증번호를 보냅니다"
      disableScramble
      onSubmit={async (serial) => {
        if (!/[1-3][1-6][0-3][0-9]/.test(serial)) {
          toast('학번 형식이 올바르지 않아요')
          return false
        }
        goto(ROUTES.SMS_VERIFICATION_PIN_INPUT, {
          state: {
            serial,
          },
        })
      }}
    />
  )
}

import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'

import { currentUserAtom } from '@/coil'
import { Pin, Regular, Vexile } from '@/component'
import { getUserFromApprovalToken, validateSmsVerification } from '@/connect'
import { ROUTES } from '@/constants'
import { useTimer } from '@/hook'

export const SmsValidationPrompt = () => {
  const goto = useNavigate()
  const setUser = useRecoilState(currentUserAtom)[1]
  const state = useLocation().state as
    | undefined
    | {
        maskedPhoneNumber: string
        timelimit: number
        serial: number
        isValid: boolean
      }

  const timer = useTimer(state?.timelimit || 60)

  useEffect(() => {
    if (timer.isEnded) {
      toast('인증번호 입력 시간이 지났습니다')
      goto(ROUTES.SCAN_PRODUCT)
    }
  }, [timer.isEnded])

  return (
    <Pin
      header={
        <Vexile gap={6} x="center">
          <Regular center>
            {state?.maskedPhoneNumber}번으로 <br /> 인증번호가 전송되었습니다
          </Regular>
          {timer.element}
        </Vexile>
      }
      onSubmit={async (pin) => {
        const res = await validateSmsVerification.request(
          {},
          {
            smsCode: pin,
            studentNumber: state!.serial,
          }
        )

        if (!res?.isValid) {
          toast(res?.message || '인증번호가 올바르지 않아요', {
            type: 'error',
          })
          return false
        }

        const preloaded = new Image()

        preloaded.src = res.user.profileImage
        preloaded.onload = () => {
          setUser(res)
          goto(ROUTES.USER_RECOGNIZED)
        }
        // return true
      }}
    />
  )
}

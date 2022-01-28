import { currentUserAtom } from '@/coil'
import { GoBack, Hexile, Regular, RegularImportant, Vexile } from '@/component'
import { getSmsVerificationInfo, getSmsVerificationResult } from '@/connect'
import { ROUTES } from '@/constants'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import { NumberWrapper, SmsIcon } from './style'

export const SmsVerification = () => {
  const { data: smsInfo, error } = getSmsVerificationInfo.useHook()
  const setUser = useRecoilState(currentUserAtom)[1]
  const goto = useNavigate()

  useEffect(() => {
    if (error) {
      toast('문자인증 정보를 받아올 수 없어요 ..', {
        type: 'error',
      })
      goto(ROUTES.SCAN_PRODUCT)
      return
    }

    ;(async () => {
      const result = await getSmsVerificationResult.request()
      if (!result) {
        toast('문자인증 정보를 받아올 수 없어요 ..', {
          type: 'error',
        })
        goto(ROUTES.SCAN_PRODUCT)
        return
      }
      setUser(result)
      goto(ROUTES.USER_RECOGNIZED)
    })()
  }, [])

  if (!smsInfo) return null

  return (
    <Vexile x="center" y="center" gap={12} filly>
      <Vexile gap={10} x="center">
        <Vexile gap={4} x="center">
          <NumberWrapper>{smsInfo.number}</NumberWrapper>
          <Hexile gap={2}>
            <SmsIcon />
            <RegularImportant accent>{smsInfo.to}</RegularImportant>
          </Hexile>
        </Vexile>
        <Regular>
          디미페이에 등록한 본인의 휴대폰으로 아래 인증번호를 위 번호에
          보내주세요
        </Regular>
      </Vexile>
      <GoBack />
    </Vexile>
  )
}

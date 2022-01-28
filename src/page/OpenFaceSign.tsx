import { faceSignIcon } from '@/asset'
import { currentUserAtom } from '@/coil'
import { Description, FaceSignLogo, GoBack, Regular, Vexile } from '@/component'
import { getFaceSignResult } from '@/connect/auth/getFaceSignResult'
import { ROUTES } from '@/constants'
import { FaceSignResultType } from '@/type/user'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'

export const OpenFaceSign = () => {
  const setUser = useRecoilState(currentUserAtom)[1]
  const goto = useNavigate()

  useEffect(() => {
    window.open('shortcut://open-shortcut?name=facesign')
    const interval = setInterval(async () => {
      const result = await getFaceSignResult.request()
      console.log(result)
      if (!result) return

      if (result?.type === FaceSignResultType.SURE) {
        setUser(result.user)
        goto(ROUTES.USER_RECOGNIZED, {
          state: {
            user: result.user,
          },
        })
      } else if (result?.type === FaceSignResultType.MULTIPLE_POSSIBILITY) {
        goto(ROUTES.PAYMENT_PIN_PROMPT, {
          state: {
            ids: result.ids,
          },
        })
      } else if (result?.type === FaceSignResultType.FAILED) {
        toast('얼굴인증에 실패헀어요..', {
          type: 'error',
        })
      }

      clearInterval(interval)
    }, 2000)
  }, [])
  return (
    <Vexile gap={9} fillx filly x="center" y="center">
      <FaceSignLogo />
      <Vexile gap={2} x="center">
        <Regular>얼굴인증을 준비하고 있어요, 조금만 기다려주세요</Regular>
        <Description accent>얼굴인증이 시작되지 않나요?</Description>
      </Vexile>
      <GoBack />
    </Vexile>
  )
}

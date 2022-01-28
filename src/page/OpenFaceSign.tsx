import { faceSignIcon } from '@/asset'
import { Description, FaceSignLogo, GoBack, Regular, Vexile } from '@/component'
import { getFaceSignResult } from '@/connect/auth/getFaceSignResult'
import { useEffect } from 'react'

export const OpenFaceSign = () => {
  useEffect(() => {
    window.open('shortcut://open-shortcut?name=facesign')
    setInterval(() => {
      getFaceSignResult.request()
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

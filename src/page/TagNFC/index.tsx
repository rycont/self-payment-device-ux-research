import { paywaveLogo } from '@/asset'
import {
  Description,
  DescriptionImportant,
  GoBack,
  PlainLink,
  Regular,
  Vexile,
} from '@/component'

import { drawBackdrop, useCanvas } from './backdrop'
import { ContentWrapper, Paywave, TimeLeftIndicator } from './style'
import { ROUTES } from '@/constants'
import { useEffect, useState } from 'react'
import { getNFCResult } from '@/connect'
import { currentUserAtom } from '@/coil'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const TagNFC = () => {
  const setUser = useRecoilState(currentUserAtom)[1]
  const [lastTime, setLastTime] = useState(20)
  const goto = useNavigate()

  const { drawboard } = useCanvas(drawBackdrop, {
    style: {
      filter: 'blur(20rem)',
      opacity: 0.2,
      pointerEvents: 'none',
    },
  })

  useEffect(() => {
    const decreaseInterval = setInterval(
      () => setLastTime((prev) => prev - 1),
      1000
    )
    const returnTimeout = setTimeout(() => {
      toast('시간이 초과되어 메인 화면으로 돌아갔어요')
      return goto(ROUTES.ROOT)
    }, 1000 * 20)
    ;(async () => {
      const result = await getNFCResult.request()
      if (result?.succeed) {
        setUser(result)
        return goto(ROUTES.USER_RECOGNIZED)
      }
    })()

    return () => {
      clearTimeout(returnTimeout)
      clearInterval(decreaseInterval)
    }
  }, [])

  return (
    <Vexile>
      <ContentWrapper gap={12} x="center">
        <Paywave src={paywaveLogo} />
        <Vexile gap={2} x="center">
          <Regular center>
            결제 단말기 화면 위쪽에 있는 NFC 태그를
            <br /> 스마트폰으로 읽어주세요
          </Regular>
          <PlainLink to={ROUTES.SMS_VERIFICATION}>
            <DescriptionImportant accent>
              문자 인증으로 결제할게요
            </DescriptionImportant>
          </PlainLink>
        </Vexile>
        <GoBack>상품 스캔 화면으로 돌아가기</GoBack>
        <Vexile fillx x="center" gap={2}>
          <TimeLeftIndicator
            css={{
              '&:after': {
                width: (20 - lastTime) * 5 + '%',
              },
            }}
          />
          <Description>{lastTime}초</Description>
        </Vexile>
      </ContentWrapper>
      {drawboard}
    </Vexile>
  )
}

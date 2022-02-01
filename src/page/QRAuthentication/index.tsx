import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { GoBack, Regular, Vexile } from '@/component'
import { useHIDInput, useTimer } from '@/hook'
import { currentUserAtom } from '@/coil'
import { ROUTES } from '@/constants'

import { drawBackdrop, useCanvas } from './backdrop'
import { ContentWrapper } from './style'

const WAITING_TIME = 60

export const TagQR = () => {
  const setUser = useRecoilState(currentUserAtom)[1]
  const goto = useNavigate()

  useHIDInput({
    isNonNumericAllowed: true,
    onData(token) {
      try {
      } catch (e) {
        toast(
          '정보무늬가 변조되었습니다. 부정사용을 방지하기 30분간 결제가 중지됩니다.',
          {
            type: 'error',
          }
        )
      }
    },
  })

  const timer = useTimer(WAITING_TIME)

  const { drawboard } = useCanvas(drawBackdrop, {
    style: {
      filter: 'blur(20rem)',
      opacity: 0.2,
      pointerEvents: 'none',
    },
  })

  useEffect(() => {
    const returnTimeout = setTimeout(() => {
      toast('시간이 초과되어 메인 화면으로 돌아갔어요')
      return goto(ROUTES.ROOT)
    }, 1000 * WAITING_TIME)

    return () => {
      clearTimeout(returnTimeout)
    }
  }, [])

  return (
    <Vexile>
      <ContentWrapper gap={12} x="center">
        <Vexile gap={6} x="center">
          <Regular center>
            디미페이 앱에서 생성된 결제 바코드를 스캔해주세요
          </Regular>
          {timer.element}
        </Vexile>
        <GoBack>상품 스캔 화면으로 돌아가기</GoBack>
      </ContentWrapper>
      {drawboard}
    </Vexile>
  )
}

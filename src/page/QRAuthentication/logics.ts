import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import jwtDecode from 'jwt-decode'

import { currentUserAtom } from '@/coil'
import { ROUTES } from '@/constants'
import { useHIDInput, useTimer } from '@/hook'
import { isUserWithPaymentToken } from '@/type'

import { useCanvas, drawBackdrop } from './backdrop'

const WAITING_TIME = 60

export const useLogics = () => {
  const setUser = useRecoilState(currentUserAtom)[1]
  const goto = useNavigate()

  useHIDInput({
    isNonNumericAllowed: true,
    onData(token) {
      try {
        const parsed = jwtDecode(token)
        if (isUserWithPaymentToken(parsed)) {
          setUser(parsed)
          goto(ROUTES.USER_RECOGNIZED)
        }
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

  return {
    state: {
      timer: timer.lastTime,
    },
    element: {
      drawboard,
    },
  }
}

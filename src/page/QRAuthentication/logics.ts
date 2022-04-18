import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import jwtDecode from 'jwt-decode'

import { currentUserAtom } from '@/coil'
import { ROUTES } from '@/constants'
import { useHIDInput, useTimer } from '@/hook'

import { useCanvas, drawBackdrop } from './backdrop'
import { getUserFromApprovalToken } from '@/connect'

export const useLogics = () => {
  const setUser = useRecoilState(currentUserAtom)[1]
  const goto = useNavigate()

  useHIDInput({
    isNonNumericAllowed: true,
    async onData(token) {
      try {
        const userInfo = await getUserFromApprovalToken.request(token)
        if (!userInfo) throw new Error()

        setUser({
          user: userInfo,
          approvalToken: token,
        })

        goto(ROUTES.USER_RECOGNIZED)
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

  const { drawboard } = useCanvas(drawBackdrop, {
    style: {
      filter: 'blur(20rem)',
      opacity: 0.2,
      pointerEvents: 'none',
    },
  })

  return {
    element: {
      drawboard,
    },
  }
}

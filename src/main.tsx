import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import 'react-toastify/dist/ReactToastify.min.css'
import React, { FunctionComponent, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import RecoilNexus from 'recoil-nexus'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import ReactDOM from 'react-dom'

import { globalCss } from '#/stitches.config'
import {
  Onboarding,
  ScanQR,
  ScanProduct,
  UserRecognized,
  OpenFaceSign,
  SmsSerialInput as SmsSerialInput,
  RequestPayment,
  SmsValidationPrompt,
  PaymentPinPrompt,
  PosAuth,
  SmsPinInput,
  CustomerViewer,
  ManualPayment,
} from '@/page'
import './animated.css'
import { ROUTES } from './constants'
import './asset/numericalGlyph/index.css'
import { ModalPlaceholder } from './component'
import { posAuthTokenAtom } from './coil'
import { getBarcodelessProduct, healthCheck, refresh } from './connect'

globalCss({
  '@import': [
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css',
  ],
  ':root': {
    fontSize: '6px',
    '--toastify-font-family': 'Pretendard',
  },
  body: {
    fontSize: '4rem',
    fontFamily: 'Pretendard',
    margin: '0px',
    overflow: 'hidden',
  },
  button: {
    fontFamily: 'Pretendard',
  },
  '*': {
    wordBreak: 'keep-all',
    userSelect: 'none',
  },
})()

const pages: Record<ROUTES, FunctionComponent> = {
  [ROUTES.ROOT]: Onboarding,
  [ROUTES.POS_AUTH]: PosAuth,
  [ROUTES.SCAN_PRODUCT]: ScanProduct,
  [ROUTES.MANUAL_PAYMENT]: ManualPayment,
  [ROUTES.SCAN_QR]: ScanQR,
  [ROUTES.USER_RECOGNIZED]: UserRecognized,
  [ROUTES.REQUEST_PAYMENT]: RequestPayment,
  [ROUTES.PAYMENT_PIN_PROMPT]: PaymentPinPrompt,
  [ROUTES.FACE_VERIFICATION]: OpenFaceSign,
  [ROUTES.SMS_VERIFICATION_SERIAL_INPUT]: SmsSerialInput,
  [ROUTES.SMS_VERIFICATION_PROMPT]: SmsValidationPrompt,
  [ROUTES.SMS_VERIFICATION_PIN_INPUT]: SmsPinInput,
  [ROUTES.CUSTOMER_VIEWER]: CustomerViewer,
}

const AnimatedRouter = () => {
  const location = useLocation()
  const goto = useNavigate()
  const posAuthToken = useRecoilValue(posAuthTokenAtom)

  useEffect(() => {
    const currentRoute = location.pathname
    const isAuthlessPage = (
      [ROUTES.POS_AUTH, ROUTES.CUSTOMER_VIEWER] as unknown as string
    ).includes(currentRoute)

    if (isAuthlessPage) return
    if (!posAuthToken) {
      goto(ROUTES.POS_AUTH)
      return
    }

    healthCheck.request().catch((e) => {
      console.log('ㅇㄴ 진짜임?')
      console.log('간다간다쑝간다', posAuthToken)
      refresh
        .request(undefined, undefined, {
          headers: {
            Authorization: `Bearer ${posAuthToken!.refreshToken}`,
          },
        })
        .catch((e) => {
          console.log('네~')
          toast.error('로그인이 필요합니다')
          goto(ROUTES.POS_AUTH)
        })
    })
  }, [location.pathname])

  return (
    <>
      <ModalPlaceholder />
      <ToastContainer />
      <RecoilNexus />
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} timeout={300} classNames="fade">
          <Routes location={location}>
            {Object.entries(pages).map(([route, Component]) => (
              <Route key={route} path={route} element={<Component />} />
            ))}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <AnimatedRouter />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)

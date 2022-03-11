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
import { ToastContainer } from 'react-toastify'
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
  SmsVerificationRequest,
  RequestPayment,
  SmsValidationPrompt,
  PaymentPinPrompt,
  PosAuth,
} from '@/page'
import './animated.css'
import { ROUTES } from './constants'
import './asset/numericalGlyph/index.css'
import { ModalPlaceholder } from './component'
import { posAuthTokenAtom } from './coil'

globalCss({
  '@import': [
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css',
  ],
  ':root': {
    fontSize: '6px',
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
  },
})()

const pages: Record<ROUTES, FunctionComponent> = {
  [ROUTES.ROOT]: Onboarding,
  [ROUTES.POS_AUTH]: PosAuth,
  [ROUTES.SCAN_PRODUCT]: ScanProduct,
  [ROUTES.SCAN_QR]: ScanQR,
  [ROUTES.USER_RECOGNIZED]: UserRecognized,
  [ROUTES.REQUEST_PAYMENT]: RequestPayment,
  [ROUTES.PAYMENT_PIN_PROMPT]: PaymentPinPrompt,
  [ROUTES.OPEN_FACE_SIGN]: OpenFaceSign,
  [ROUTES.SMS_VERIFICATION_REQUEST]: SmsVerificationRequest,
  [ROUTES.SMS_VERIFICATION_PROMPT]: SmsValidationPrompt,
}

const AnimatedRouter = () => {
  const location = useLocation()
  const goto = useNavigate()
  const posAuthToken = useRecoilValue(posAuthTokenAtom)

  useEffect(() => {
    if (location.pathname.slice(1) !== ROUTES.POS_AUTH && !posAuthToken)
      goto(ROUTES.POS_AUTH)
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

import { globalCss } from '#/stitches.config'
import React, { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import {
  Onboarding,
  TagNFC,
  ScanProduct,
  UserRecognized,
  OpenFaceSign,
} from '@/page'
import './animated.css'
import { PaymentSucceed } from './page/PaymentSucceed'
import { RecoilRoot, useRecoilState } from 'recoil'
import { modalContentAtom } from './coil'
import { PaymentPinPrompt } from './page/PaymentPinPrompt'
import { ROUTES } from './constants'

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
})()

const pages: Record<ROUTES, FunctionComponent> = {
  [ROUTES.ROOT]: Onboarding,
  [ROUTES.SCAN_PRODUCT]: ScanProduct,
  [ROUTES.TAG_NFC]: TagNFC,
  [ROUTES.USER_RECOGNIZED]: UserRecognized,
  [ROUTES.PAYMENT_SUCCEED]: PaymentSucceed,
  [ROUTES.PAYMENT_PIN_PROMPT]: PaymentPinPrompt,
  [ROUTES.OPEN_FACE_SIGN]: OpenFaceSign,
  [ROUTES.SMS_VERIFICATION]: () => <div>SMS Verification</div>,
}

const AnimatedRouter = () => {
  const location = useLocation()
  const [modalContent] = useRecoilState(modalContentAtom)

  return (
    <>
      <Modal isOpen={!!modalContent}>{modalContent}</Modal>
      <ToastContainer />
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

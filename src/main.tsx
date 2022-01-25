import { globalCss } from '#/stitches.config'
import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { Onboarding, PinPage, Purchase, ScanProduct, UserChecked } from '@/page'
import './animated.css'
import { PaymentSucceed } from './page/PaymentSucceed'
import { RecoilRoot, useRecoilState } from 'recoil'
import { modalContentAtom } from './coil'

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

const AnimatedRouter = () => {
  const location = useLocation()
  const [modalContent] = useRecoilState(modalContentAtom)

  return (
    <>
      <Modal isOpen={!!modalContent}>{modalContent}</Modal>
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} timeout={300} classNames="fade">
          <Routes location={location}>
            <Route path="/" element={<Onboarding />} />
            <Route path="/scan-product" element={<ScanProduct />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/user-checked" element={<UserChecked />} />
            <Route path="/success" element={<PaymentSucceed />} />
            <Route path="/pin-page" element={<PinPage />} />
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

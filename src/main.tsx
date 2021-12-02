import { globalCss } from '#/stitches.config'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { Onboarding, Purchase, ScanProduct, UserChecked } from '@/page'
import './animated.css'

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
  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} timeout={300} classNames="fade">
        <Routes location={location}>
          <Route path="/" element={<Onboarding />} />
          <Route path="/scan-product" element={<ScanProduct />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/user-checked" element={<UserChecked />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AnimatedRouter />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

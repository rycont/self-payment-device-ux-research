import { globalCss } from '@/stitches.config'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Onboarding } from './page'

globalCss({
  "@import": ["https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css"],
  ":root": {
    fontSize: "8px"
  },
  body: {
    fontSize: "4rem",
    fontFamily: 'Pretendard',
    margin: '0px'
  },
})()

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

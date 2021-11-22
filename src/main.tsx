import { globalCss } from '../stitches.config'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Onboarding } from './page'

globalCss({
  ":root": {
    fontSize: "12px"
  },
  body: {
    fontSize: "4rem"
  }
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

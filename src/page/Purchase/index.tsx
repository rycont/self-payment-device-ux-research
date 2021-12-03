import { useEffect, useRef } from 'react'
import { Transition } from 'react-transition-group'

import { paywaveLogo } from '@/asset'
import { DescriptionImportant, Regular, Vexile } from '@/component'

import { drawBackdrop, useCanvas } from './backdrop'
import { ContentWrapper, Paywave } from './style'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

export const Purchase = () => {
  const { drawboard } = useCanvas(drawBackdrop, {
    style: {
      filter: 'blur(20rem)',
      opacity: 0.3,
      pointerEvents: 'none',
    },
  })
  const goto = useNavigate()
  return (
    // <Transition timeout={5000}>
    //   {(state) => (
    <Vexile>
      <ContentWrapper gap={6} x="center">
        <Link to="/user-checked">
          <Paywave src={paywaveLogo} />
        </Link>
        <Vexile gap={2} x="center">
          <Regular center>
            결제 단말기 화면 위쪽에 있는 NFC 태그를
            <br /> 스마트폰으로 읽어주세요
          </Regular>
          <DescriptionImportant accent>
            문자 인증으로 결제할게요
          </DescriptionImportant>
        </Vexile>
      </ContentWrapper>
      {drawboard}
    </Vexile>
    //   )}
    // </Transition>
  )
}

import { paywaveLogo } from '@/asset'
import { DescriptionImportant, Regular, SubHeader, Vexile } from '@/component'
import { useEffect, useRef } from 'react'
import { drawBackdrop, useCanvas } from './backdrop'
import { ContentWrapper, Paywave } from './style'

export const Purchase = () => {
  const { drawboard } = useCanvas(drawBackdrop)
  return (
    <Vexile>
      <ContentWrapper gap={6} x="center">
        <Paywave src={paywaveLogo} />
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
  )
}

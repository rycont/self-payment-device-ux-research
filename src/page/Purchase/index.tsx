import { paywaveLogo } from '@/asset'
import {
  DescriptionImportant,
  GoBack,
  PlainLink,
  Regular,
  Vexile,
} from '@/component'

import { drawBackdrop, useCanvas } from './backdrop'
import { ContentWrapper, Paywave } from './style'
import { useNavigate } from 'react-router'

export const Purchase = () => {
  const { drawboard } = useCanvas(drawBackdrop, {
    style: {
      filter: 'blur(20rem)',
      opacity: 0.2,
      pointerEvents: 'none',
    },
  })
  return (
    <Vexile>
      <ContentWrapper gap={6} x="center">
        <Paywave src={paywaveLogo} />
        <Vexile gap={2} x="center">
          <Regular center>
            결제 단말기 화면 위쪽에 있는 NFC 태그를
            <br /> 스마트폰으로 읽어주세요
          </Regular>
          <PlainLink to="sms-verification">
            <DescriptionImportant accent>
              문자 인증으로 결제할게요
            </DescriptionImportant>
          </PlainLink>
        </Vexile>
        <GoBack>상품 스캔 화면으로 돌아가기</GoBack>
      </ContentWrapper>
      {drawboard}
    </Vexile>
  )
}

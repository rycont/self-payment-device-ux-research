import { verticalLogo } from '@/asset'
import { DescriptionImportant, PlainLink, Regular, Vexile } from '@/component'
import { ROUTES } from '@/constants'
import { useHIDInput } from '@/hook'
import { useNavigate } from 'react-router'

import { MainLogo } from './style'

function Onboarding() {
  const goto = useNavigate()

  useHIDInput({
    onData(e) {
      console.log(e)
    },
  })

  return (
    <Vexile fillx filly x="center" y="center" gap={12}>
      <MainLogo
        src={verticalLogo}
        alt=""
        onClick={() => goto(ROUTES.SCAN_PRODUCT)}
      />
      <Vexile x="center" gap={2}>
        <Regular>물건의 바코드를 스캔해서 결제를 시작해주세요</Regular>
        <PlainLink to="scan-barcode">
          <DescriptionImportant accent>
            물건에 바코드가 없나요?
          </DescriptionImportant>
        </PlainLink>
      </Vexile>
    </Vexile>
  )
}

export { Onboarding }

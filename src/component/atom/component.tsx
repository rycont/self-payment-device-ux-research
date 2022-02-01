import { leftArrow } from '@/asset'
import { ROUTES } from '@/constants'
import { Description, GoBackButton, Hexile, PlainLink } from '.'

export const GoBack: React.FC<{
  to?: string
}> = (props) => (
  <Hexile gap={2}>
    <GoBackButton src={leftArrow} />
    <PlainLink to={props.to || ROUTES.SCAN_PRODUCT}>
      <Description>{props.children || '상품 화면으로'}</Description>
    </PlainLink>
  </Hexile>
)

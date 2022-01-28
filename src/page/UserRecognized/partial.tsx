import { Description, Regular, Vexile } from '@/component'
import { Coupon } from '@/type'
import { CouponViewWrapper } from './style'

export const CouponView: React.FC<Coupon> = (couponData) => (
  <CouponViewWrapper padding={6} x="space">
    <Vexile gap={1.5}>
      <Regular>{couponData.name}</Regular>
      <Description>{couponData.issuer}</Description>
    </Vexile>
    <Vexile gap={1.5} x="right" y="center">
      <Regular accent>{couponData.price.toLocaleString()}원</Regular>
    </Vexile>
  </CouponViewWrapper>
)

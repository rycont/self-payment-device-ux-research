import { cartAtom, selectedCouponIdsAtom } from '@/coil'
import {
  Button,
  Description,
  DescriptionImportant,
  Hexile,
  PlainLink,
  Regular,
  RegularImportant,
  Vexile,
} from '@/component'
import { Doc } from '@/connect'
import { ROUTES } from '@/constants'
import { Coupon } from '@/type'
import { toast } from 'react-toastify'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CouponViewWrapper } from './style'

export const CouponView: React.FC<
  Coupon & {
    onClick: () => void
    selected?: boolean
    disabled: boolean
  }
> = (couponData) => (
  <CouponViewWrapper
    disabled={!couponData.selected && couponData.disabled}
    selected={couponData.selected}
    padding={6}
    x="space"
    fillx
    onClick={couponData.onClick}
  >
    <Vexile gap={1.5}>
      <Regular>{couponData.name}</Regular>
      <Description>{couponData.issuer}</Description>
    </Vexile>
    <Vexile gap={1.5} x="right" y="center">
      <Regular accent>{couponData.price.toLocaleString()}원</Regular>
    </Vexile>
  </CouponViewWrapper>
)

export const CouponSelector: React.FC<{
  coupons: Doc<Coupon>[]
  onSubmit: () => void
}> = (props) => {
  const [selectedCouponIds, setSelectedCouponIds] = useRecoilState(
    selectedCouponIdsAtom
  )
  const cart = useRecoilValue(cartAtom).reduce((a, b) => a + b.price, 0)

  const couponSum = props.coupons
    .filter((e) => selectedCouponIds.includes(e.id))
    .reduce((a, b) => a + b.price, 0)

  const isAddable = couponSum < cart

  return (
    <Vexile
      gap={4}
      style={{
        width: '90rem',
      }}
    >
      <RegularImportant>쿠폰을 사용하시겠어요?</RegularImportant>
      <Vexile gap={2}>
        {props.coupons.map((e) => (
          <CouponView
            disabled={!isAddable}
            selected={selectedCouponIds.includes(e.id)}
            onClick={() => {
              if (selectedCouponIds.includes(e.id))
                setSelectedCouponIds((prev) => prev.filter((id) => id !== e.id))
              else if (isAddable)
                setSelectedCouponIds((prev) => [...new Set([...prev, e.id])])
              else toast('결제 금액보다 쿠폰을 많이 사용할 수 없어요')
            }}
            {...e}
            key={e.id}
          />
        ))}
      </Vexile>
      <Hexile x="space" fillx y="center">
        {couponSum ? (
          <Button type="accent" fill onClick={props.onSubmit}>
            {couponSum}원 할인 받아서 {cart - couponSum}원 결제
          </Button>
        ) : (
          <DescriptionImportant accent onClick={props.onSubmit}>
            쿠폰을 사용하지 않을래요 ({cart}원 결제)
          </DescriptionImportant>
        )}
      </Hexile>
    </Vexile>
  )
}

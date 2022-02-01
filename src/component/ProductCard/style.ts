import { styled } from '#/stitches.config'
import { Description, Vexile } from '@/component'

export const ProductWrapper = styled(Vexile, {
  backgroundColor: 'white',
  padding: '4rem',
  borderRadius: '2rem',
  width: '36rem',
  elevated: true,
})

export const DiscountedPrice = styled(Description, {
  opacity: '0.36 !important',
})

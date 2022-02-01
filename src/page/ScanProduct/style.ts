import { styled } from '#/stitches.config'
import { Vexile } from '@/component'

export const ViewArea = styled(Vexile, {
  backgroundColor: '$dark6',
})

export const PurchaseButtonWrapper = styled(Vexile, {
  backgroundColor: '$accent',
  color: 'white',
  variants: {
    disabled: {
      true: {
        backgroundColor: '$dark4',
      },
    },
  },
})

export const NonBarcodeProductWrapper = styled(Vexile, {
  position: 'absolute',
  bottom: '36rem',
  width: '100%',
  left: '0rem',
})

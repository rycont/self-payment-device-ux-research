import { styled } from '#/stitches.config'
import { Vexile } from '@/component'

export const ViewArea = styled(Vexile, {
  backgroundColor: '$background',
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
  bottom: '30rem',
  width: '100%',
})

import { styled } from '#/stitches.config'
import { Vexile } from '@/component'

export const Paywave = styled('img', {
  width: '30rem',
  opacity: 0.4,
  mixBlendMode: 'overlay',
})

export const ContentWrapper = styled(Vexile, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  mixBlendMode: 'overlay',
  variants: {
    appearState: {
      entering: {},
      entered: {},
      exiting: {
        opacity: 0.1,
      },
      exited: {},
      unmounted: {},
    },
  },
})

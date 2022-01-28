import { keyframes, styled } from '#/stitches.config'
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
})

const grow = keyframes({
  '0%': {
    width: '0%',
  },
  '100%': {
    width: '100%',
  },
})

export const TimeLeftIndicator = styled('div', {
  height: '1rem',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  width: '100%',
  borderRadius: '1rem',
  overflow: 'hidden',
  '&:after': {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    content: '',
    display: 'block',
    height: '1rem',
    width: '0%',
    transition: '1s linear',
  },
})

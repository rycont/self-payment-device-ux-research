import { styled } from '#/stitches.config'
import { Vexile } from '@/component'

export const ContentWrapper = styled(Vexile, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  mixBlendMode: 'overlay',
})

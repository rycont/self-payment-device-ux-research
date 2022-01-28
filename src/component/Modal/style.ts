import { Vexile } from '..'
import { styled } from '#/stitches.config'

export const ModalBackdrop = styled(Vexile, {
  backgroundColor: 'rgba(0, 0, 0, 0.03)',
  position: 'fixed',
  zIndex: 1,
  padding: '6rem',
})

export const ModalWrapper = styled(Vexile, {
  accentShadow: true,
  accentBorder: true,
  borderRadius: '3rem',
  maxWidth: '480px',
})

import { Vexile } from '..'
import { keyframes, styled } from '#/stitches.config'

const backdropAppear = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
})

const backdropDisappear = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
})

export const ModalBackdrop = styled(Vexile, {
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  position: 'fixed',
  zIndex: 1,
  padding: '6rem',
  animation: `800ms cubic-bezier(0, 1, 0, 1) ${backdropAppear}`,
  variants: {
    isClosing: {
      true: {
        animation: `800ms cubic-bezier(0, 1, 0, 1) ${backdropDisappear}`,
      },
    },
  },
})

const appear = keyframes({
  from: {
    transform: 'translate(0, 20rem)',
  },
  to: {
    transform: 'translate(0, 0)',
  },
})

const disappear = keyframes({
  from: {
    transform: 'translate(0, 0)',
  },
  to: {
    transform: 'translate(0, 20rem)',
  },
})

export const ModalWrapper = styled(Vexile, {
  accentShadow: true,
  accentBorder: true,
  borderRadius: '3rem',
  maxWidth: '480px',
  animation: `${appear} 800ms cubic-bezier(0, 1, 0, 1)`,
  variants: {
    isClosing: {
      true: {
        animation: `800ms cubic-bezier(0, 1, 0, 1) forwards ${disappear}`,
      },
    },
  },
})

import { styled } from '#/stitches.config'

export const NumberButton = styled('div', {
  fontSize: '5rem',
  fontWeight: '500',
  padding: '6rem',
  borderRadius: '1rem',
  animated: true,
  '&:active': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
})

export const RemoveDigit = styled('div', {
  position: 'absolute',
  right: '0rem',
  bottom: '0rem',
  padding: '6rem',
  '&:active': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
})

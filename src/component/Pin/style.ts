import { styled } from '#/stitches.config'

export const PinDigit = styled('div', {
  width: '8rem',
  height: '10rem',
  backgroundColor: '#EEEEEE',
  borderRadius: '1rem',
  boxSizing: 'border-box',
  animated: true,
  variants: {
    filled: {
      true: {
        position: 'relative',
        '&:after': {
          content: '',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '2rem',
          height: '2rem',
          backgroundColor: '#7D7D7D',
          borderRadius: '1rem',
        },
      },
    },
    focused: {
      true: {
        elevated: true,
        boxShadow: 'inset 0rem 0rem 0rem 0.5rem $accent',
        backgroundColor: 'white',
      },
    },
  },
})

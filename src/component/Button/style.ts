import { styled } from '#/stitches.config'

export const ButtonWrapper = styled('button', {
  padding: '3rem 4rem',
  color: 'white',
  border: 'none',
  borderRadius: '1rem',
  boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.12)',
  variants: {
    type: {
      black: {
        backgroundColor: '$actionableGray',
      },
      accent: {
        backgroundColor: '$accent',
      },
    },
    fill: {
      true: {
        width: '100%',
      },
    },
    high: {
      true: {
        high: true,
      },
    },
  },
})

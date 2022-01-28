import { styled } from '#/stitches.config'
import { Hexile } from '@/component'

export const UserProfileImage = styled('img', {
  width: '30rem',
})

export const CouponViewWrapper = styled(Hexile, {
  backgroundColor: 'white',
  borderRadius: '2rem',
  animated: true,
  elevated: true,
  variants: {
    selected: {
      true: {
        boxShadow: '0px 0.5rem 1rem rgba(46, 164, 171, 0.36)',
        borderColor: '$accent',
      },
    },
    disabled: {
      true: {
        '&>*': {
          opacity: 0.5,
        },
      },
    },
  },
})

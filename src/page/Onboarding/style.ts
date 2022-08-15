import { styled } from '#/stitches.config'
import { Vexile } from '@/component'

export const MainLogo = styled('img', {
  width: '25rem',
})

export const ConnectInfo = styled(Vexile, {
  position: 'absolute',
  top: '2rem',
  right: '2rem',
  fontSize: '3rem',
})

export const Status = styled('div', {
  borderRadius: '50%',
  width: '1rem',
  height: '1rem',
  variants: {
    connect: {
      true: {
        backgroundColor: '#00ff00cc',
        boxShadow: '0px 0px 4px 2px #00ff00cc',
      },
      false: {
        backgroundColor: '#ff0000cc',
        boxShadow: '0px 0px 4px 2px #ff0000cc',
      }
    },
  }
})
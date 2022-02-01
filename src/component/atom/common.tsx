import { Link } from 'react-router-dom'
import { styled } from '#/stitches.config'
import { faceSignIcon } from '@/asset'
import { PageHeader } from '.'

export const PlainLink = styled(Link, {
  textDecoration: 'none',
  color: 'inherit',
})

export const UnderlinedPageHeader = styled(PageHeader, {
  borderBottom: '0.5rem solid $accent',
  paddingBottom: '3rem',
  color: '$accent',
})

export const GoBackButton = styled('img', {
  width: '1rem',
})

export const FaceSignLogo = styled('img', {
  height: '20rem',
})

FaceSignLogo.defaultProps = {
  src: faceSignIcon,
  alt: '얼굴인증 아이콘',
}

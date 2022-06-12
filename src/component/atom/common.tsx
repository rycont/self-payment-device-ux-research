import { Link } from 'react-router-dom'
import { styled } from '#/stitches.config'
import { faceSignIcon } from '@/asset'
import { PageHeader } from '.'
import { Vexile } from './flexile'

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

export const Callout = styled(Vexile, {
  backgroundColor: '$dark6',
  borderRadius: '4rem',
})

Callout.defaultProps = {
  gap: 1,
  padding: 4,
}

FaceSignLogo.defaultProps = {
  src: faceSignIcon,
  alt: '얼굴인증 아이콘',
}

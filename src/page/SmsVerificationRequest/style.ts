import { styled } from '#/stitches.config'
import { smsIcon } from '@/asset'

export const SmsIcon = styled('img', {
  height: '5rem',
})

export const NumberWrapper = styled('div', {
  height: '40rem',
  width: '40rem',
  backgroundColor: '#E5F0F1',
  fontSize: '15rem',
  fontFamily: 'NumerialNexon',
  textAlign: 'center',
  lineHeight: '40rem',
  color: '$accent',
  borderRadius: '15rem',
  letterSpacing: '-0.03em',
})

SmsIcon.defaultProps = {
  src: smsIcon,
}

import { DescriptionImportant } from '@/component'
import { ButtonWrapper } from './style'

export const Button: React.FC<{
  onClick?: () => void
  type?: 'accent' | 'black'
  fill?: boolean
  high?: boolean
}> = (props) => {
  return (
    <ButtonWrapper
      onClick={props.onClick}
      type={props.type || 'black'}
      fill={props.fill}
      high={props.high}
    >
      <DescriptionImportant>{props.children}</DescriptionImportant>
    </ButtonWrapper>
  )
}

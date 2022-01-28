import { DescriptionImportant } from '@/component'
import { ButtonWrapper } from './style'

export const Button: React.FC<{
  onClick?: () => void
  type?: 'accent' | 'black'
  fill?: boolean
}> = (props) => {
  return (
    <ButtonWrapper
      onClick={props.onClick}
      type={props.type || 'black'}
      fill={props.fill}
    >
      <DescriptionImportant>{props.children}</DescriptionImportant>
    </ButtonWrapper>
  )
}

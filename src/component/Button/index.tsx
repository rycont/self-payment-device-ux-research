import { DescriptionImportant } from '@/component'
import { ButtonWrapper } from './style'

export const Button: React.FC<{
  onClick?: () => void
}> = (props) => {
  return (
    <ButtonWrapper onClick={props.onClick}>
      <DescriptionImportant>{props.children}</DescriptionImportant>
    </ButtonWrapper>
  )
}

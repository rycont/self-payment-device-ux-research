import { DescriptionImportant } from '@/component'
import { ButtonWrapper } from './style'

export const Button: React.FC<{}> = (props) => {
  return (
    <ButtonWrapper>
      <DescriptionImportant>{props.children}</DescriptionImportant>
    </ButtonWrapper>
  )
}

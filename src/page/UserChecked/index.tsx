import { SubHeader } from '@/component'
import { Transition } from 'react-transition-group'

export const UserChecked = () => {
  return (
    <Transition timeout={1200}>
      {(state) => <SubHeader>부제목인데부제목으로안씀</SubHeader>}
    </Transition>
  )
}

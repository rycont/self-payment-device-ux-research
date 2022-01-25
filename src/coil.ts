import { atom } from 'recoil'

export const modalContentAtom = atom<JSX.Element | null>({
  default: null,
  key: 'MODAL_CONTENT',
})

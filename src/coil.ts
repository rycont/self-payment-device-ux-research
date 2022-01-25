import { atom } from 'recoil'
import { Doc } from './connect'
import { Product } from './type'

export const modalContentAtom = atom<JSX.Element | null>({
  default: null,
  key: 'MODAL_CONTENT',
})

export const cartAtom = atom<Doc<Product>[]>({
  default: [],
  key: 'CARD',
})

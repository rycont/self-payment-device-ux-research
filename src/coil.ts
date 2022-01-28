import { atom } from 'recoil'
import { Doc } from './connect'
import { Product } from './type'
import { User } from './type/user'

export const modalContentAtom = atom<JSX.Element | null>({
  default: null,
  key: 'MODAL_CONTENT',
})

export const cartAtom = atom<Doc<Product>[]>({
  default: [],
  key: 'CART',
})

export const currentUserAtom = atom<{
  user: User
  paymentToken: string
} | null>({
  default: null,
  key: 'CURRENT_USER',
})

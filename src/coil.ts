import { atom } from 'recoil'
import { Doc } from './connect'
import { Product, User } from './type'

export const modalContentAtom = atom<{
  dismissable: boolean
  content: JSX.Element
  onClose?(): void
} | null>({
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

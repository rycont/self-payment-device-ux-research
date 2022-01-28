import { atom } from 'recoil'
import { Doc } from './connect'
import { Coupon, Product, User } from './type'

export const modalContentAtom = atom<{
  dismissable: boolean
  content: JSX.Element
  onClose?(): void
} | null>({
  default: null,
  key: 'MODAL_CONTENT',
})

export const selectedCouponIdsAtom = atom<number[]>({
  key: 'SELECTED_COUPONS',
  default: [],
})

export const modalAppearanceAtom = atom<boolean>({
  default: false,
  key: 'MODAL_APPEARANCE',
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

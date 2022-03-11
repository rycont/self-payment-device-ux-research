import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { Doc } from './connect'
import { calculateDiscountedPrice } from './function'
import { PosAuth, Product, UserWithPaymentToken } from './type'

const { persistAtom } = recoilPersist()

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
  effects_UNSTABLE: [persistAtom],
})

export const cartSumSelector = selector({
  key: 'CART/SUM',
  get: ({ get }) => {
    return get(cartAtom).reduce(
      (a, b) => a + calculateDiscountedPrice(b.price, b.discountPolicy),
      0
    )
  },
})

export const currentUserAtom = atom<UserWithPaymentToken | null>({
  default: null,
  key: 'CURRENT_USER',
})

export const posAuthTokenAtom = atom<PosAuth | null>({
  default: null,
  key: 'POS_AUTH',
  effects_UNSTABLE: [persistAtom],
})

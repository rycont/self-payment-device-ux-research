import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRecoilState, useRecoilValue } from 'recoil'
import jwtDecode from 'jwt-decode'

import { cartAtom, cartSumSelector, currentUserAtom } from '@/coil'
import { Doc, getProductByBarcode } from '@/connect'
import { ROUTES } from '@/constants'
import { useHIDInput } from '@/hook'
import { Product } from '@/type'

export const useLogics = () => {
  const [showNonBarcodeProduct, setShowNonBarcodeProduct] = useState(false)
  const [loadingProductsAmount, setLoadingProductsAmount] = useState(0)
  const [products, setProducts] = useRecoilState(cartAtom)
  const cartSum = useRecoilValue(cartSumSelector)

  const setUser = useRecoilState(currentUserAtom)[1]
  const goto = useNavigate()
  const location = useLocation()

  const functions = {
    addNonBarcodeProduct(product: Doc<Product>) {
      setProducts((registeredProduct) => [...registeredProduct, product])
      setShowNonBarcodeProduct(false)
    },
    removeProductByIndex(index: number) {
      setProducts((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])
    },
    goToPurchasePage() {
      goto(ROUTES.FACE_VERIFICATION)
    },
    removeAll() {
      setProducts(() => [])
    },
    toggleNonBarcodeProduct() {
      setShowNonBarcodeProduct((e) => !e)
    },
    async addProductByBarcode(barcode: string) {
      setLoadingProductsAmount((prev) => prev + 1)

      try {
        const res = await getProductByBarcode.request({
          barcode,
        })

        if (!res || !res.product) {
          throw new Error()
        }

        setProducts((prev) => [...prev, res.product])
      } catch (e) {
        toast('상품 정보를 찾을 수 없어요', {
          type: 'error',
          autoClose: 2000,
        })
      }

      setLoadingProductsAmount((prev) => prev - 1)
    },
  }

  useHIDInput({
    onData(data) {
      if (data.startsWith('eyJ')) {
        try {
          // const parsed = jwtDecode(data)
          // if (isUserWithPaymentToken(parsed)) {
          // setUser(parsed)
          // goto(ROUTES.USER_RECOGNIZED)
          // }
        } catch (e) {
          toast(
            '정보무늬가 변조되었습니다. 부정사용을 방지하기 30분간 결제가 중지됩니다.',
            {
              type: 'error',
            }
          )
        }
      } else functions.addProductByBarcode(data)
    },
  })

  useEffect(() => {
    if (location.state?.init) functions.addProductByBarcode(location.state.init)
    if (location.state?.noBarcode) setShowNonBarcodeProduct(true)
  }, [location.state])

  return {
    state: {
      products,
      loadingProductsAmount,
      showNonBarcodeProduct,
      cartSum,
    },
    logics: functions,
  }
}

import { cartAtom } from '@/coil'
import { Doc, getProductByBarcode } from '@/connect'
import { ROUTES } from '@/constants'
import { useHIDInput } from '@/hook'
import { Product } from '@/type'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'

export const useLogics = () => {
  const [products, setProducts] = useRecoilState(cartAtom)
  const [isLoading, setIsLoading] = useState(false)
  const [showNonBarcodeProduct, setShowNonBarcodeProduct] = useState(false)

  const navigate = useNavigate()
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
      setProducts(products)
      navigate(ROUTES.OPEN_FACE_SIGN)
    },
    removeAll() {
      setProducts(() => [])
    },
    toggleNonBarcodeProduct() {
      setShowNonBarcodeProduct((e) => !e)
    },
    async addProductByBarcode(barcode: string) {
      setIsLoading(true)

      try {
        const product = await getProductByBarcode.request({
          barcode,
        })

        if (!product) throw new Error()

        setProducts((prev) => [...prev, product])
      } catch (e) {
        toast('상품 정보를 찾을 수 없어요', {
          type: 'error',
          autoClose: 2000,
        })
      }

      setIsLoading(false)
    },
  }

  useHIDInput({
    onData: functions.addProductByBarcode,
  })

  useEffect(() => {
    location.state?.init && functions.addProductByBarcode(location.state.init)
  }, [location.state?.init])

  return {
    state: {
      products,
      isLoading,
      showNonBarcodeProduct,
    },
    logics: functions,
  }
}

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

  const addProductByBarcode = async (barcode: string) => {
    setIsLoading(true)

    try {
      const product = await getProductByBarcode.request({
        productId: barcode,
      })

      if (!product) throw new Error()

      setProducts([...products, product])
    } catch (e) {
      toast('상품 정보를 찾을 수 없어요', {
        type: 'error',
        autoClose: 2000,
      })
    }

    setIsLoading(false)
  }

  useHIDInput({
    onData: addProductByBarcode,
  })

  useEffect(() => {
    location.state.init && addProductByBarcode(location.state.init)
  }, [location.state.init])

  const addNonBarcodeProduct = (product: Doc<Product>) => {
    setProducts((registeredProduct) => [...registeredProduct, product])
    setShowNonBarcodeProduct(false)
  }

  const removeProductByIndex = (index: number) => {
    setProducts((keys) => [...keys.slice(0, index), ...keys.slice(index + 1)])
  }

  const goToPurchasePage = () => {
    setProducts(products)
    navigate(ROUTES.OPEN_FACE_SIGN)
  }

  const removeAll = () => {
    setProducts(() => [])
  }

  const toggleNonBarcodeProduct = () => {
    setShowNonBarcodeProduct((e) => !e)
  }

  return {
    products,
    removeProduct: removeProductByIndex,
    goToPurchasePage,
    removeAll,
    isLoading,
    addProduct: addNonBarcodeProduct,
    showNonBarcodeProduct,
    toggleNonBarcodeProduct,
  }
}

import { Description, Hexile, Space, Vexile } from '@/atom'
import { Doc, getProductById } from '@/connect'
import { Product } from '@/type/product'
import { useEffect, useState } from 'react'
import { ProductCard } from './partial'
import { ViewArea } from './style'

function ScanProduct() {
  const [productsKey, setProducts] = useState<string[]>([])

  const addProduct = async (e: KeyboardEvent) => {
    if (isNaN(+e.key)) return

    setProducts((prevProducts) => [...prevProducts, e.key])

    // getProductById
    //   .request({
    //     productId: numericKey.toString(),
    //   })
    //   .catch(console.log)
    //   .then((e) => setProducts(e))
  }

  useEffect(() => {
    window.addEventListener('keypress', addProduct)
    return () => window.removeEventListener('keypress', addProduct)
  }, [])

  return (
    <Vexile fillx filly>
      <ViewArea filly>
        <Description>상품을 터치해서 삭제할 수 있어요</Description>
        <Space size={3} />
        <Hexile gap={3} linebreak>
          {productsKey?.map((key) => (
            <ProductCard id={key} key={key} onClick={(e) => console.log(e)} />
          ))}
        </Hexile>
      </ViewArea>
      <Hexile>ㅁㅇㄴ ㅁㅇㄴㄹ ㅁㄴㅇㄹ</Hexile>
    </Vexile>
  )
}

export { ScanProduct }

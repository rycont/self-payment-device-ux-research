import { styled } from '#/stitches.config'
import {
  Regular,
  Hexile,
  Description,
  DiscountedPrice,
  Vexile,
  PageHeader,
  SectionHeader,
} from '@/component'
import { calculateDiscountedPrice } from '@/function'
import { useFluid } from '@/hook'
import { Product } from '@/type'
import { useEffect, useMemo, useState } from 'react'
import { ViewArea } from '../ScanProduct/style'
import { AwesomeQR } from 'awesome-qr'
import { MainLogo } from '../Onboarding/style'
import { LogoB64, verticalLogo } from '@/asset'
import { TOSS_ID } from '@/constants'

const Card = styled(Hexile, {
  backgroundColor: 'white',
  border: '3px solid $dark5',
  borderRadius: '2rem',
})

const ProductList: React.FC<{
  products: Product[]
  totalPrice: number
}> = (props) => {
  return (
    <ViewArea filly padding={6} gap={3} scrolly>
      <PageHeader accent>
        <Regular>{props.totalPrice}원</Regular>
      </PageHeader>
      {props.products.map((product) => (
        <Card padding={4} x="space">
          <Regular>{product.name}</Regular>
          <Hexile gap={1}>
            {product.discountPolicy ? (
              <>
                <DiscountedPrice strike>
                  {product.sellingPrice}원
                </DiscountedPrice>
                <Description>
                  {calculateDiscountedPrice(
                    product.sellingPrice,
                    product.discountPolicy
                  )}
                  원
                </Description>
              </>
            ) : (
              <>
                <Description>{product.sellingPrice}원</Description>
              </>
            )}
          </Hexile>
        </Card>
      ))}
    </ViewArea>
  )
}

export const CustomerViewer: React.FC = () => {
  const [fluid] = useFluid<{
    products: Product[]
    isReady: boolean
  }>('products', {
    isReady: false,
    products: [],
  })

  const totalPrice = useMemo(
    () =>
      fluid.products.reduce(
        (a, b) =>
          a + calculateDiscountedPrice(b.sellingPrice, b.discountPolicy),
        0
      ),
    [fluid.products]
  )

  const [qr, setQR] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      const res = await new AwesomeQR({
        text: `https://toss.me/${TOSS_ID}/${totalPrice}`,
        size: 600,
        logoImage: LogoB64,
        logoScale: 0.2,
      }).draw()
      if (res) setQR(res as string)
    })()
  }, [totalPrice])

  if (fluid.products.length === 0) {
    return (
      <Vexile x="center" y="center" filly gap={4}>
        <MainLogo src={verticalLogo} alt="디미페이 로고" />
        <SectionHeader center>계산할 물건을 테이블에 올려주세요</SectionHeader>
        <Description>계좌 송금으로 결제가 진행됩니다.</Description>
      </Vexile>
    )
  }

  if (!fluid.isReady) {
    return <ProductList products={fluid.products} totalPrice={totalPrice} />
  } else {
    return (
      <Vexile x="center" y="center" filly gap={2}>
        <SectionHeader center>
          QR코드를 스캔해서 <br></br>
          결제를 진행해주세요
        </SectionHeader>
        <Description>계좌 송금으로 결제가 진행됩니다.</Description>
        {qr && <img style={{ width: '30rem' }} src={qr} />}
        <PageHeader accent>{totalPrice}원</PageHeader>
      </Vexile>
    )
  }
}

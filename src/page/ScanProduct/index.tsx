import { MAIN_ACCENT } from '#/stitches.config'
import { HashLoader } from 'react-spinners'

import {
  Button,
  ProductView,
  ProductWrapper,
  Description,
  Hexile,
  Vexile,
  GoBack,
  DescriptionImportant,
  PageHeader,
  PlainLink,
} from '@/component'
import { ROUTES } from '@/constants'

import { NonBarcodeProduct } from './partial'
import { ViewArea } from './style'
import { useLogics } from './logic'

const authenticationMethods = [
  // {
  //   label: '앱 QR 결제',
  //   route: ROUTES.SCAN_QR,
  // },
  // {
  //   label: '문자인증',
  //   route: ROUTES.SMS_VERIFICATION_SERIAL_INPUT,
  // },
  // {
  //   label: '얼굴인증',
  //   route: ROUTES.OPEN_FACE_SIGN,
  // },
  {
    label: '계산하기!',
    route: ROUTES.MANUAL_PAYMENT,
  },
]

function ScanProduct() {
  const { state, logics } = useLogics()

  return (
    <Vexile fillx filly>
      <ViewArea filly padding={6} gap={3} scrolly>
        <Description>상품을 터치해서 삭제할 수 있어요</Description>
        <Hexile gap={3} linebreak>
          {state.products.map((product, index) => (
            <ProductView
              onClick={() => {
                logics.removeProductByIndex(index)
              }}
              {...product}
            />
          ))}
          {state.loadingProductsAmount !== 0 &&
            [...Array(state.loadingProductsAmount)].map((_, index) => (
              <ProductWrapper key={index}>
                <Vexile x="center" y="center" filly>
                  <HashLoader size={30} color={MAIN_ACCENT} />
                </Vexile>
              </ProductWrapper>
            ))}
        </Hexile>
      </ViewArea>
      <Vexile relative gap={2} padding={6}>
        {state.showNonBarcodeProduct && (
          <NonBarcodeProduct selectProduct={logics.addNonBarcodeProduct} />
        )}
        <Hexile x="space" y="center">
          <GoBack />
          <Hexile gap={2}>
            <Button onClick={logics.toggleNonBarcodeProduct}>
              바코드가 없는 상품 등록
            </Button>
            <Button onClick={logics.removeAll}>상품 전체 삭제</Button>
          </Hexile>
        </Hexile>
        <Hexile x="space">
          <Vexile gap={1}>
            <DescriptionImportant css={{ color: '$dark3' }}>
              {state.products.length}개 상품
            </DescriptionImportant>
            <PageHeader accent>{state.cartSum.toLocaleString()}원</PageHeader>
          </Vexile>
          <Hexile gap={2}>
            {authenticationMethods.map((item) =>
              state.cartSum ? (
                <PlainLink to={item.route}>
                  <Button high type="accent">
                    {item.label}
                  </Button>
                </PlainLink>
              ) : (
                <Button high type="accent">
                  {item.label}
                </Button>
              )
            )}
          </Hexile>
        </Hexile>
      </Vexile>
    </Vexile>
  )
}

export { ScanProduct }

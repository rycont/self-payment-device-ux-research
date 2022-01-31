import { MAIN_ACCENT } from '#/stitches.config'
import { HashLoader } from 'react-spinners'

import {
  Button,
  ProductView,
  ProductWrapper,
  Description,
  Hexile,
  Space,
  Vexile,
  GoBack,
  DescriptionImportant,
  PageHeader,
  PlainLink,
} from '@/component'

import { NonBarcodeProduct } from './partial'
import { ViewArea } from './style'
import { useLogics } from './logic'
import { ROUTES } from '@/constants'

const authenticationMethods = [
  {
    label: '앱 QR 결제',
    route: ROUTES.TAG_NFC,
  },
  {
    label: '문자인증',
    route: ROUTES.SMS_VERIFICATION,
  },
  {
    label: '얼굴인증',
    route: ROUTES.OPEN_FACE_SIGN,
  },
]

function ScanProduct() {
  const { state, logics } = useLogics()

  return (
    <Vexile fillx filly>
      <ViewArea filly padding={6}>
        <Description>상품을 터치해서 삭제할 수 있어요</Description>
        <Space size={3} />
        <Hexile gap={3} linebreak>
          {state.products.map((product, index) => (
            <ProductView
              key={product.id}
              onClick={() => logics.removeProductByIndex(index)}
              {...product}
            />
          ))}
          {state.isLoading && (
            <ProductWrapper>
              <Vexile x="center" y="center" filly>
                <HashLoader size={30} color={MAIN_ACCENT} />
              </Vexile>
            </ProductWrapper>
          )}
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
            <PageHeader accent>
              {state.cartSum.toLocaleString()}원 결제
            </PageHeader>
          </Vexile>
          <Hexile gap={2}>
            {authenticationMethods.map((item) => (
              <PlainLink to={item.route}>
                <Button high type="accent">
                  {item.label}
                </Button>
              </PlainLink>
            ))}
          </Hexile>
        </Hexile>
      </Vexile>
    </Vexile>
  )
}

export { ScanProduct }

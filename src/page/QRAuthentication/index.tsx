import { GoBack, Regular, Vexile } from '@/component'
import { ContentWrapper } from './style'
import { useLogics } from './logics'

export const ScanQR = () => {
  const { element } = useLogics()
  return (
    <Vexile>
      <ContentWrapper gap={12} x="center">
        <Vexile gap={6} x="center">
          <Regular center>
            디미페이 앱에서 표시되는 결제 바코드를 스캔해주세요
          </Regular>
        </Vexile>
        <GoBack>상품 스캔 화면으로 돌아가기</GoBack>
      </ContentWrapper>
      {element.drawboard}
    </Vexile>
  )
}

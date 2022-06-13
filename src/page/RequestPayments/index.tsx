import { useNavigate } from 'react-router'
import { failed, success } from '@/asset'
import { Description, GoBack, Lottie, PageHeader, Vexile } from '@/component'
import { ROUTES } from '@/constants'
import { useLocation } from 'react-router-dom'

export const RequestPayment = () => {
  const prevState = useLocation().state as
    | {
        succeed: true
        transactionId: string
      }
    | {
        succeed: false
      }

  const goto = useNavigate()

  // if (prevState.succeed)
  //   return (
  //     <Vexile fillx filly x="center" y="center">
  //       <HashLoader size={30} color={MAIN_ACCENT} />
  //     </Vexile>
  //   )

  if (prevState?.succeed)
    return (
      <Vexile fillx filly x="center" y="center" gap={4}>
        <Lottie
          width={40}
          height={40}
          speed={0.7}
          loop={false}
          animate={success}
          autoReverse
          onFinish={() => goto(ROUTES.ROOT)}
        />
        <PageHeader>결제가 완료되었습니다</PageHeader>
      </Vexile>
    )

  return (
    <Vexile fillx filly x="center" y="center" gap={4}>
      <Lottie
        width={40}
        height={40}
        speed={1.8}
        loop={false}
        animate={failed}
        onFinish={() => {}}
      />
      <Vexile gap={2} x="center">
        <PageHeader>결제에 실패했어요</PageHeader>
        <Description>
          결제 가능한 시간이 지났어요. 100초 이내에 결제를 마무리 해주세요.
        </Description>
      </Vexile>
      <GoBack />
    </Vexile>
  )
}

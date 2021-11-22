import { verticalLogo } from "@/src/asset/brand"
import { DescriptionImportant, Hexile, Regular, Vexile } from "@/src/atoms"
import { MainLogo } from "./style"

export const Onboarding = () => {
    return <Vexile fillx filly x="center" y="center" gap={12}>
        <MainLogo src={verticalLogo} alt="" />
        <Vexile x="center" gap={2}>
            <Regular>
                물건의 바코드를 스캔해서 결제를 시작해주세요
            </Regular>
            <DescriptionImportant accent>물건에 바코드가 없나요?</DescriptionImportant>
        </Vexile>
    </Vexile>
}

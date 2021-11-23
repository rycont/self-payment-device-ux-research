import { Description, Regular } from "@/atom"
import { ProductWrapper } from "./style"

const ProductView: React.FC = () => {
    return <ProductWrapper gap={1}>
        <Regular>갈아 만든 배</Regular>
        <Description>3,500원</Description>
    </ProductWrapper>
}

export const Product: React.FC<{ id: string }> = ({ id }) => {
    return <ProductWrapper />
}

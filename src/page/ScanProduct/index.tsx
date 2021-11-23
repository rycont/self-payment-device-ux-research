import { Description, Hexile, Space, Vexile } from "@/atom"
import { Product } from "./partial"
import { ViewArea } from "./style"

function ScanProduct() {
    return <Vexile fillx filly>
        <ViewArea filly>
            <Description>
                상품을 터치해서 삭제할 수 있어요
            </Description>
            <Space size={3} />
            <Hexile gap={3} linebreak>
                <Product id="1010" />
                <Product id="1010" />
                <Product id="1010" />
                <Product id="1010" />
                <Product id="1010" />
                <Product id="1010" />
                <Product id="1010" />
                <Product id="1010" />
            </Hexile>
        </ViewArea>
        <Hexile>
            ㅁㅇㄴ ㅁㅇㄴㄹ ㅁㄴㅇㄹ
        </Hexile>
    </Vexile>
}

export { ScanProduct }

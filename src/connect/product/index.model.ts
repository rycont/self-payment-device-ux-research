import { Product } from "@/type/product";
import { createMockModel } from "..";

export const productMockModel = createMockModel<Product>('product', [{
    _id: "1",
    name: "갈아 만든 배",
    price: 1000
}, {
    _id: "2",
    name: "허니콤보",
    price: 3000
}, {
    _id: "3",
    name: "디트로이트 피자",
    price: 17000
}, {
    _id: "4",
    name: "프라임립",
    price: 4000,
    discountPolicy: {
        percent: 35
    }
}, {
    _id: "5",
    name: "초밥",
    price: 1000
}])

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
}])

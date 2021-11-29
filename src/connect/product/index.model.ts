import { Product } from "@/type/product";
import { createMockModel } from "..";

export const productMockModel = createMockModel<Product>('product', [{
    _id: "1010",
    name: "갈아 만든 배",
    price: 1000
}])
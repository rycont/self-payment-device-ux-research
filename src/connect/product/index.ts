import { Product } from "@/type/product";
import { createMockModel } from "..";

export const productMockModel = createMockModel<Product>('product', [{
    _id: "0101",
    name: "갈아 만든 배",
    price: 1000
}])

export * from "./getProductById"

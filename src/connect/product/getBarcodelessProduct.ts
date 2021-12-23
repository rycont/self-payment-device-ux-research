import { Product } from "@/type";
import { createAPIConnector, Doc } from "..";

export const getBarcodelessProduct = createAPIConnector<{}, {}, Doc<Product>[]>('product/barcodeless', {
    method: "GET",
    needAuth: false,
    mockHandler() {
        return [{
            _id: "101010010100",
            name: "넥타이",
            price: 1000,
        }]
    }
})

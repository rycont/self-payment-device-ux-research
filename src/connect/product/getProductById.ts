import { Product } from "@/type/product";
import { createAPIConnector, Doc } from "..";
import { productMockModel } from "./index.model";

export const getProductById = createAPIConnector<{
  productId: string
}, undefined, Doc<Product>>("product/:productId", {
  method: 'GET',
  needAuth: false,
  mockHandler: productMockModel.get('productId')
})

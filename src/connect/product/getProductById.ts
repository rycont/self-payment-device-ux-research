import { Product } from "@/type/product";
import { productMockModel } from ".";
import { createAPIConnector, Doc } from "..";

export const getProductById = createAPIConnector<{
  productId: string
}, undefined, Doc<Product>>("product/:productId", {
  method: 'GET',
  needAuth: false,
  mockHandler: productMockModel.get('productId')
})

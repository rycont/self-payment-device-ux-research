export interface Product {
  name: string;
  price: number;
  discountPolicy?: {
    percent?: number;
    fixedPrice?: number;
  }
}

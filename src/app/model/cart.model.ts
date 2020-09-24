import { Product } from '../interface/product.interface';

export class Cart {
    constructor(
        public product: Product,
        public subtotal: number
    ) {}
}

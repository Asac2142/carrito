import { Product } from '../interface/product.interface';

export class Cart {
    constructor(
        private product: Product,
        private subtotal: number
    ) {}
}

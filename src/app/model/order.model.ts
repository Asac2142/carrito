export class Order {
    constructor(
        private orderId: number,
        private userId: string,
        private detail: string,
        private subTotal: number
    ) {}
}

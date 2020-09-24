export class Order {
    constructor(
        public orderId: number,
        public userId: string,
        public detail: string,
        public subtotal: number,
        public total: number
    ) {}
}

import { Injectable } from '@angular/core';

import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private order: Order[] = [];
  
  constructor() { }

  public getOrderList(): Order[] {
    return this.order;
  }

  public addToOrderList(order: Order): void {
    this.order.push(order);
  }

  public removeFromCart(id: number): void {
    this.order.splice(id, 1);
  }
}

import { Component, OnInit } from '@angular/core';

import { Product } from '../interface/product.interface';
import { Cart } from '../model/cart.model';
import { Order } from '../model/order.model';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  public productsOnCart: Cart[] = [];
  private randomNumber: number;
  private subtotal = 0;
  private total = 0;
  private IVA = 0.12;

  constructor(private cartService: CartService, private orderService: OrderService) { }

  ngOnInit(): void {  
    this.productsOnCart = this.cartService.getCart();
    this.calcSubtotal();
    this.calcTotal();
  }

  public removeProduct(product: Product): void {
    this.cartService.removeFromCart(product.id);
    this.calcSubtotal();
    this.calcTotal();
  }

  public getSubtotal(): number {
    return this.subtotal;
  }

  public getTotal(): number {
    return this.total;
  }

  public onPurchase(): void {
    const order = new Order(
      this.getOrderId(),
      this.getUserId(),
      this.getOrderDetail(),
      this.getSubtotal(),
      this.getTotal()
    );
    this.orderService.addOrder(order);
    this.orderService.storeOrder(order);
  }

  private calcSubtotal(): void {
    this.subtotal = 0; 
    this.productsOnCart.map(product => this.subtotal += product.subtotal);
  }

  private calcTotal(): void {
    this.total = 0;
    this.total = this.subtotal + (this.subtotal * this.IVA);
  }

  private getOrderId(): number {
    this.randomNumber = Math.floor(Math.random() * 5000) + 1;
    return this.randomNumber;
  }

  private getUserId(): string {
    return `user_${this.randomNumber}`;
  }

  private getOrderDetail(): string {
    let detail: string = '';
    this.productsOnCart.map(e => detail = `${e.product.name} ${e.product.qty} ${e.subtotal}`);
    return detail;
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Cart } from '../model/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart[] = [];
  public cartEmitter: Subject<Cart[]> = new Subject<Cart[]>();

  constructor() { }

  public getCart(): Cart[] {
    return this.cart;
  }

  public addToCart(cart: Cart): void {
    this.cart.push(cart);
    console.log(this.cart);
  }

  public removeFromCart(id: string): void {
    const position = this.cart.findIndex(e => e.product.id === id);
    this.cart.splice(position, 1);
  }
}

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
  }

  public removeFromCart(id: string): void {
    const position = this.cart.findIndex(e => e.id === id);
    this.cart.splice(position, 1);
  }

  public resetCart(): void {
    this.cart.splice(0);
  }
}

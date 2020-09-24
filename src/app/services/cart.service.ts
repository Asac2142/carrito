import { Injectable } from '@angular/core';
import { Cart } from '../model/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart[] = [];

  constructor() { }

  public getCart(): Cart[] {
    return this.cart;
  }

  public addToCart(cart: Cart): void {
    this.cart.push(cart);
    console.log(this.cart);
  }

  public removeFromCart(id: number): void {
    this.cart.splice(id, 1);
  }
}

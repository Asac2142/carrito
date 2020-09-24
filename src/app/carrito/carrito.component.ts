import { Component, OnInit } from '@angular/core';

import { Product } from '../interface/product.interface';
import { Cart } from '../model/cart.model';
import { Order } from '../model/order.model';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import * as uuid from 'uuid';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  public productsOnCart: Cart[] = [];
  private subtotal = 0;
  private total = 0;
  private IVA = 0.12;
  form: FormGroup;

  constructor(
    private cartService: CartService, 
    private orderService: OrderService,
    private _notification: NotificationsService,
    private _fb: FormBuilder,) { }

  ngOnInit(): void {  
    this.productsOnCart = this.cartService.getCart();
    this.calcSubtotal();
    this.calcTotal();

    this.form = this._fb.group({      
			type: 'success',
			title: 'Compra realizada con exito',
			content: 'Listo!, tu compra fue hecha',
			timeOut: 5000,
			showProgressBar: true,
			pauseOnHover: true,
			clickToClose: true,
      animate: 'fromRight'      
		});
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
      uuid.v4(),
      this.getUserId(),
      this.getOrderDetail(),
      this.getSubtotal(),
      this.getTotal()
    );
    this.orderService.addOrder(order);
    this.orderService.storeOrder(order).subscribe(response => {      
      if (response.message.toLowerCase().trim() === 'ok') {        
        this.cartService.resetCart();
        this.getNotification();
      }
    });
  }

  private getNotification(): void {
    const temp = this.form.getRawValue();
		const title = temp.title;
		const content = temp.content;
		const type = temp.type;

		delete temp.title;
		delete temp.content;
		delete temp.type;

		this._notification.create(title, content, type, temp)
  }

  private calcSubtotal(): void {
    this.subtotal = 0; 
    this.productsOnCart.map(product => this.subtotal += product.subtotal);
  }

  private calcTotal(): void {
    this.total = 0;
    this.total = this.subtotal + (this.subtotal * this.IVA);
  }

  private getUserId(): string {
    return `user_${Math.floor(Math.random() * 5000) + 1}`;
  }

  private getOrderDetail(): string {
    let detail: string = '';
    this.productsOnCart.map(e => detail += `**${e.product.name} **${e.product.qty} **${e.subtotal}`);    
    return detail;
  }
}

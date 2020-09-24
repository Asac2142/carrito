import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NotificationsService } from 'angular2-notifications';
import { Product } from '../interface/product.interface';
import { ProductsService } from '../services/products.service';
import { Cart } from '../model/cart.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  public products: Product[];  
  form: FormGroup;

  constructor(
    private _notification: NotificationsService,
    private _fb: FormBuilder,
    private productService: ProductsService, 
    private cartService: CartService) { }

  ngOnInit(): void {
    this.products = [];    
    this.productService.getProducts().subscribe(products => {
      products.map((product: Product) => {
        this.products.push( {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          qty: 0
        })
      });
    });

    this.form = this._fb.group({      
			type: 'success',
			title: 'Producto agregado',
			content: 'Tu producto se agreago al carrito',
			timeOut: 5000,
			showProgressBar: true,
			pauseOnHover: true,
			clickToClose: true,
      animate: 'fromRight'      
		});
  }

  public addQuantity(product: Product): void {
    product.qty++;    
  }

  public substractQuantity(product: Product): void {
    if (product.qty > 0) {
      product.qty--;
    }
  }

  public onAddingOrder(product: Product): void {
    if (product.qty > 0) {
      const productAdded = new Cart(
        product,
        this.getSubtotal(product),
        this.getId(product)
      );
      this.cartService.addToCart(productAdded);
      this.cartService.cartEmitter.next(this.cartService.getCart());
      this.getNotification();
    }        
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

  private getSubtotal(product: Product): number {
    return product.qty * product.price;
  }

  private getId(product: Product): string {
    return `${product.id}_${Math.floor(Math.random() * 5000) + 1}`;
  }
}

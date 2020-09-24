import { Component, OnInit } from '@angular/core';

import { Product } from '../interface/product.interface';
import { Order } from '../model/order.model';
import { OrderService } from '../services/order.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  public products: Product[];
  private randomNumber: number;

  constructor(private productService: ProductsService, private orderService: OrderService) { }

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
    const orderAdded = new Order(
      this.getOrderId(), 
      this.getUserId(), 
      this.getDetail(product), 
      this.getSubtotal(product));

    this.orderService.addToOrderList(orderAdded);
  }

  private getUserId(): string {
    this.randomNumber = Math.floor(Math.random() * 5000) + 1;
    return `user_${this.randomNumber}`;
  }

  private getOrderId(): number {
    return this.randomNumber;
  }

  private getDetail(product: Product): string {
    return `${product.name} ${product.qty} ${product.qty * product.price}`;
  }  

  private getSubtotal(product: Product) {
    return product.qty * product.price;
  }
}

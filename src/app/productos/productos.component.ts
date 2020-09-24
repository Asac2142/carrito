import { Component, OnInit } from '@angular/core';

import { Product } from '../interface/product.interface';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  public products: Product[];

  constructor(private productService: ProductsService) { }

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

  public onAddingProduct(product: Product): void {
    
  }

}

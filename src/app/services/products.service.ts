import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private URL = 'http://52.13.159.18:5000/sabroso_dev_test/api/v1/products';

  constructor(private httpClient: HttpClient) { }

  public getProducts(): Observable<Product> {
    return this.httpClient.get<Product>(this.URL);
  }
}

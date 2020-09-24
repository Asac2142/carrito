import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private order: Order[] = [];  
  private URL: string = 'http://52.13.159.18:5000/sabroso_dev_test/api/v1/orders/';

  constructor(private http: HttpClient) { }

  public addOrder(order: Order): void {
    this.order.push(order);
  }

  public getOrder(): Order[] {
    return this.order;
  }

  public storeOrder(order: Order): Observable<any> {
    const freshOrder = {      
      userId: order.userId,
      details: order.detail,
      subtotal: order.subtotal,
      total: order.total
    }    
    
    return this.http.post(`${this.URL}${order.orderId}`, JSON.stringify(freshOrder));      
  }  
}

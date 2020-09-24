import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  public orderList: any[] = [];
  public detailHistory: any[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderList = this.orderService.getOrder();
    this.getDetailHistory();
  }

  public getDetailHistory(): void {
    let detail = [];
    let d;

    for (let i = 0; i < this.orderList.length; i++) {
      detail = this.orderList[i].detail.split('**');
    }

    for (let i = 1; i < detail.length; i++) {
      d = {
        product: detail[i],
        cantidad: detail[++i],
        precio: detail[++i]
      }
      this.detailHistory.push(d);
    }
  }

  public onShowModal(): void {
    this.modal.nativeElement.style.display = 'block';
  }

  public onCloseModal(): void {
    this.modal.nativeElement.style.display = 'none';
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/product.model";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-order-product',
  standalone: true,
  imports: [
    NgForOf,
    InputNumberModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './order-product.component.html',
  styleUrl: './order-product.component.scss'
})
export class OrderProductComponent implements OnInit{

  @Input() products!: Product[];
  @Input() totalPrice!: number;
  @Output() eventOrdered = new EventEmitter<void>();
  @Output() eventUpdateQuantityToOrder = new EventEmitter<Product[]>();

  constructor(private productService: ProductService) {
  }

  public ngOnInit() { }

  submitOrder() {
    const clientName = sessionStorage.getItem('currentMemberName');
    const clientId = sessionStorage.getItem('currentUserId');
    const currentDate: Date = new Date();
    const isoDateString = currentDate.toISOString();

    /*if(clientName && clientId) {
      this.productService.orderProducts({
        /!*clientName: clientName,
        activeName: this.activeMember.name,
        date: isoDateString,
        totalPrice: this.totalPrice,
        materialIds: this.products
          .filter(product => product.id !== undefined && product.id !== null)
          .map(product => product.id!),
        clientId: clientId,
        activeId: this.activeMember.id*!/
      }).subscribe( order => {
          this.eventOrdered.emit();
        });
    }*/
  }

  computeTotalPrice() {
    let totalPrice = 0;
    this.products.forEach((product) => {
      if(product.price && product['quantityToOrder']) {
        totalPrice += product.price * product['quantityToOrder'];
      }
    });
    this.eventUpdateQuantityToOrder.emit(this.products);
    this.totalPrice = totalPrice;
  }

}

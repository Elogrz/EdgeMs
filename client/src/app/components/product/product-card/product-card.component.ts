import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../models/product.model";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {NgClass, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    NgOptimizedImage,
    NgStyle,
    NgClass,
    NgIf
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit{

  @Output() addedToCart = new EventEmitter();
  @Output() removedFromCart = new EventEmitter();
  @Input() product!: Product;
  inCart: boolean = false;

  constructor(private messageService: MessageService,) {
  }

  ngOnInit() { }

  addRemoveCartItem(product: Product) {
    this.inCart = !this.inCart;
    if (this.inCart) {
      this.addedToCart.emit(product);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Added to cart' })
    } else {
      this.removedFromCart.emit(product);
      this.messageService.add({ severity: 'info', summary: 'Removed', detail: 'Removed from cart' })
    }
  }

}

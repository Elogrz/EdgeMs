import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuComponent} from "../../menu/menu.component";
import {AutoFocusModule} from "primeng/autofocus";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InscriptionFormComponent} from "../../inscription/inscription-form/inscription-form.component";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ProductService} from "../../../services/product.service";
import {BadgeModule} from "primeng/badge";
import { ToastModule } from 'primeng/toast';
import {Product} from "../../../models/product.model";
import {OrderProductComponent} from "../order-product/order-product.component";
import {CardModule} from "primeng/card";
import {Observable} from "rxjs";
import {ProductCardComponent} from "../product-card/product-card.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MenuComponent,
    AutoFocusModule,
    ButtonModule,
    DialogModule,
    InscriptionFormComponent,
    NgForOf,
    NgIf,
    RippleModule,
    SharedModule,
    TableModule,
    BadgeModule,
    NgStyle,
    ToastModule,
    OrderProductComponent,
    CardModule,
    NgOptimizedImage,
    AsyncPipe,
    ProductCardComponent
  ],
  providers: [MessageService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})

export class ProductListComponent implements OnInit{
  @ViewChild('orderMaterialComponent', {read: OrderProductComponent}) orderMaterialComponent?: OrderProductComponent;
  products?: Observable<Product[]>;
  productsToOrder?: Product[];
  selectedProductToOrder: Product[] = [];
  columns: any[] = []
  isShopDialogOpen = false;
  activeMember = false;

  constructor(private productService: ProductService,
              private messageService: MessageService,
              private router: Router) {}

  ngOnInit() {
    this.activeMember = sessionStorage.getItem('currentMemberType') === 'Actif';
    if(this.activeMember) {
      this.columns = [
        { field: 'serial', header: 'Numéro de série', pSortableColumn: 'serial', frozen: true },
        { field: 'brand', header: 'Marque', pSortableColumn: 'brand'},
        { field: 'model', header: 'Modèle', pSortableColumn: 'model'},
        { field: 'type', header: 'Type', pSortableColumn: 'type'},
        { field: 'price', header: 'Prix', pSortableColumn: 'price'},
        { field: 'buttons', header: '', visible: true}
      ];
    } else {
      this.columns = [
        { field: 'serial', header: 'Numéro de série', pSortableColumn: 'serial', frozen: true },
        { field: 'brand', header: 'Marque', pSortableColumn: 'brand'},
        { field: 'model', header: 'Modèle', pSortableColumn: 'model'},
        { field: 'type', header: 'Type', pSortableColumn: 'type'},
        { field: 'price', header: 'Prix', pSortableColumn: 'price'},
      ];
    }
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }

  openShopDialog() {
    if(this.selectedProductToOrder.length > 0) {
      this.isShopDialogOpen = true;
    }
  }

  closeShopDialog() {
    this.isShopDialogOpen = false;
  }

  submitOrder() {
    this.isShopDialogOpen = false;
    const param = JSON.stringify(this.productsToOrder);
    this.router.navigateByUrl(`/pay-cart/${param}`);
  }

  validOrder() {
    this.loadProducts();
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Ta commande est passée' });
  }

  validMaterial(product: Product) {
    this.loadProducts();
    const message = 'Nouveau produit: ' + product.name + ' ajouté';
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: message });
  }

  computeTotalPrice (): number {
    let totalPrice = 0;
    this.selectedProductToOrder.forEach((product) => {
      if(product.price) {
        totalPrice += product.price;
      }
    });
    return totalPrice;
  }

  addToCart(product: Product) {
    this.selectedProductToOrder.push({
      quantityToOrder: 1,
      ...product
    });
  }

  updateQuantityToOrder(products: Product[]) {
    this.productsToOrder = products;
  }

  removeFromCart(product: Product) {
    const index = this.selectedProductToOrder.indexOf(product);
    if (index !== -1) {
      this.selectedProductToOrder.splice(index, 1);
    }
  }

}

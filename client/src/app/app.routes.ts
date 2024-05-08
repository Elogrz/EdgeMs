import { Routes } from '@angular/router';
import {ConnexionComponent} from "./components/connexion/connexion.component";
import {AuthGuard} from "./services/permission.service";
import {InscriptionPageComponent} from "./components/inscription/inscription-page/inscription-page.component";
import {ProductListComponent} from "./components/product/product-list/product-list.component";
import {PaymentComponent} from "./components/payment/payment.component";

export const routes: Routes = [
  {path: '', component: ProductListComponent, canActivate: [AuthGuard]},
  {path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard]},
  {path: 'pay-cart/:productsToOrder', component: PaymentComponent, canActivate: [AuthGuard]},
  {path: 'auth/login', component: ConnexionComponent},
  {path: 'sign-in', component: InscriptionPageComponent},
];

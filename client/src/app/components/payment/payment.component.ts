import {Component, EventEmitter, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {SelectButtonModule} from "primeng/selectbutton";
import {SharedModule} from "primeng/api";
import {TooltipModule} from "primeng/tooltip";
import {Member} from "../../models/member.model";
import {regexValidator} from "../../services/regexValidator.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MenuComponent} from "../menu/menu.component";
import {PaymentService} from "../../services/payment-service";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    SelectButtonModule,
    SharedModule,
    TooltipModule,
    MenuComponent
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  @Output() eventPaymentValidated = new EventEmitter<Member>();


  paymentForm = this.fb.group({
    address: this.fb.group({
      number: [null, Validators.required, regexValidator(/^\d{1,4}[A-Za-z]{0,3}$/)],
      street: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
      city: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
      cp: [null, Validators.required, regexValidator(/^\d{5}$/)]
    }),
    bankAccount: this.fb.group({
      accountName: [null, Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
      cbValidationCode: [null, Validators.required, regexValidator(/^\d{3}$/)],
      cbExpirationDate: ['', Validators.required],
      cbNumber: [null, Validators.required, regexValidator(/^\d{16}$/)]
    })
  });


  constructor(private fb: FormBuilder,
              private paymentService: PaymentService,
              private productService: ProductService,
              private router: Router) { };

  public ngOnInit() {
  }

  submit(): boolean {
    if(this.paymentForm && this.paymentForm.valid) {
      const email = this.paymentForm.get('email')?.value;
      const number = this.paymentForm.get('address')?.get('number')?.value;
      const street = this.paymentForm.get('address')?.get('street')?.value;
      const cp = this.paymentForm.get('address')?.get('cp')?.value;
      const city = this.paymentForm.get('address')?.get('city')?.value;
      const firstname = this.paymentForm.get('firstName')?.value;
      const password = this.paymentForm.get('password')?.value;
      const name = this.paymentForm.get('lastName')?.value;

      if(email && number && street && city && cp && city && firstname && password && name) {
        this.paymentService.pay(1000).subscribe( payment => {
            const accepted = true;
            if(accepted){
              //this.productService.orderProducts();
              this.router.navigateByUrl('product-list');
              //this.eventPaymentValidated.emit();
            }
          }
        );
      }
      return true;
    } else {
      return false;
    }
  }

  reset() {
    this.paymentForm.reset();
  }

}

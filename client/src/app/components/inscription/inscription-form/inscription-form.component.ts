import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {InputTextModule} from "primeng/inputtext";
import { FormBuilder, Validators } from '@angular/forms';
import {regexValidator} from "../../../services/regexValidator.service";
import {DropdownModule} from "primeng/dropdown";
import {SelectButtonModule} from "primeng/selectbutton";
import {InputNumberModule} from "primeng/inputnumber";
import {NgIf} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Member} from "../../../models/member.model";



@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    PasswordModule,
    ButtonModule,
    TooltipModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    SelectButtonModule,
    InputNumberModule,
    NgIf
  ],
  templateUrl: './inscription-form.component.html',
  styleUrl: './inscription-form.component.scss'
})
export class InscriptionFormComponent implements OnInit{

  @Output() eventUserCreated = new EventEmitter<Member>();


  inscriptionForm = this.fb.group({
    firstName: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
    lastName: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
    email: ['', Validators.required, regexValidator(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)],
    address: this.fb.group({
      number: [null, Validators.required, regexValidator(/^\d{1,4}[A-Za-z]{0,3}$/)],
      street: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
      city: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
      cp: [null, Validators.required, regexValidator(/^\d{5}$/)]
    }),
    password: ['', Validators.required, [regexValidator(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]],
  });


  constructor(private fb: FormBuilder,
              private memberService: AuthService,
              private auth: AuthService,
              private router: Router) { };

  public ngOnInit() {
  }

  submit(): boolean {
    if(this.inscriptionForm && this.inscriptionForm.valid) {
      const email = this.inscriptionForm.get('email')?.value;
      const number = this.inscriptionForm.get('address')?.get('number')?.value;
      const street = this.inscriptionForm.get('address')?.get('street')?.value;
      const cp = this.inscriptionForm.get('address')?.get('cp')?.value;
      const city = this.inscriptionForm.get('address')?.get('city')?.value;
      const firstname = this.inscriptionForm.get('firstName')?.value;
      const password = this.inscriptionForm.get('password')?.value;
      const name = this.inscriptionForm.get('lastName')?.value;

      if( email && number && street && city && cp && city && firstname && password && name) {
        this.memberService.signUp({
          address: {
            number: number,
            street: street,
            cp: cp,
            city: city,
          },
          city: city,
          email: email,
          firstname: firstname,
          password: password,
          name: name,
        }).subscribe( member => {
          const password = member.password;
          const firstName = member.firstName;
          if(password && firstName){
            this.eventUserCreated.emit({
              password: password,
              firstname: firstname
            });
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
    this.inscriptionForm.reset();
  }

}

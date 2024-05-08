import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AddressService} from "./address-service";
import {UtilsService} from "./utils-service";
import {Product} from "../models/product.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ApiUrls} from "../shared/api-url";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private token!: string;

  constructor(private http: HttpClient,
              private addressService: AddressService,
              private utils: UtilsService) {
  }

  pay(amount: number) {
    const payUrl = environment.apiHost + ApiUrls.payment.pay;
    const body = JSON.stringify({
      amount: amount
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(payUrl, body, {headers: headers});
  }

}

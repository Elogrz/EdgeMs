import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ApiUrls} from "../shared/api-url";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UtilsService} from "./utils-service";
import {Order} from "../models/order.model";
import {Product} from "../models/product.model";

@Injectable({ providedIn: 'root' })

export class ProductService {

  constructor(private http: HttpClient,
              private utils: UtilsService) {
  }

  getProducts(): Observable<Product[]> {
    const getAllProducts = environment.apiHost + ApiUrls.product.getAll;
    return this.http.get<any>(getAllProducts);
  }

  orderProducts(order: Order): Observable<any> {
    const orderUrl = environment.apiHost + ApiUrls.order.create;
    const body = JSON.stringify({
      id: this.utils.generateId(12),
      clientId: order.clientId,
      date: order.date,
      totalPrice: order.totalPrice,
      paid: true,
      productOrders: order.productOrderIds
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(orderUrl, body, {headers: headers});
  }
  getMaterialsData(): Product[] {
    return [
      {
        id: '1',
        serial: '12345',
        brand: 'Apple',
        model: 'Mac M1',
        type: 'Laptop',
        price: 2300,
        groupId: '1'
      },
      {
        id: '2',
        serial: '16478',
        brand: 'Lenovo',
        model: 'Yoga P9',
        type: 'Laptop',
        price: 1300,
        groupId: '1'
      },
      {
        id: '3',
        serial: '56476',
        brand: 'Intel',
        model: 'i7 13e gen',
        type: 'Processor',
        price: 450,
        groupId: '1'
      },
      {
        id: '4',
        serial: '675789987',
        brand: 'Dell',
        model: 'Power +',
        type: 'Laptop',
        price: 850,
        groupId: '1'
      },
      {
        id: '5',
        serial: '17865',
        brand: 'Asus',
        model: 'Zenbook',
        type: 'Laptop',
        price: 2000,
        groupId: '1'
      },
      {
        id: '6',
        serial: '34537',
        brand: 'Samsung',
        model: 'Book air',
        type: 'Laptop',
        price: 1800,
        groupId: '1'
      },
      {
        id: '7',
        serial: '986875',
        brand: 'Apple',
        model: 'Mac M2',
        type: 'Laptop',
        price: 2500,
        groupId: '1'
      },
      {
        id: '8',
        serial: '564567',
        brand: 'AMD',
        model: 'Rizen 5',
        type: 'Processor',
        price: 250,
        groupId: '1'
      },
      {
        id: '9',
        serial: '9986106',
        brand: 'Electronix',
        model: 'Elec',
        type: 'Cable haute tension',
        price: 43,
        groupId: '2'
      },
    ];
  }
  getMaterialsDataPromise(): Promise<Product[]> {
    return Promise.resolve(this.getMaterialsData().slice(0, 200));
  }
};

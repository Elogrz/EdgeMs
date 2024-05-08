import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ApiUrls} from "../shared/api-url";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UtilsService} from "./utils-service";
import {AddressService} from "./address-service";
import {Member} from "../models/member.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string;

  constructor(private http: HttpClient,
              private addressService: AddressService,
              private utils: UtilsService) {
  }

  login(email: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      resolve(true);
      this.findUser(email, password).subscribe(response => {
        if (response.membreId !== 'null') {
          resolve(true);
        } else {
          resolve(false);
        }
      }, error => {
        resolve(false);
      });
    });
  }

  logOut() {
  }

  getToken(): string | null {
    return "token";
  }

  findUser(email: string, password: string): Observable<any> {
    const loginUrl = environment.apiHost + ApiUrls.members.login;
    const body = JSON.stringify({email: email, password: password});
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(loginUrl, body, {headers: headers});
  }

  signUp(member: Member): Observable<any> {
    const signInUrl = environment.apiHost + ApiUrls.members.inscription
      + '?username=' + member.firstname + '&password=' + member.password;
    /*const body = JSON.stringify({
      id: this.utils.generateId(12),
      nom: member.name,
      prenom: member.firstname,
      adresse: this.addressService.addressToString(member.address),
      typeMembre: member.memberType,
      idGroupe: member.groupId,
      idCommande: '',
      email: member.email,
      password: member.password
    });*/
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(signInUrl,{headers: headers});
  }

  parseMember(rawMember: any): Member {
    const parts = rawMember.adresse?.split(',');
    if(parts && parts.length == 2) {
      const numberAndStreet = parts[0].trim().split(' ');
      if(numberAndStreet && numberAndStreet.length > 1) {
        const numberStr = numberAndStreet[0];
        const number = parseInt(numberStr);
        const street = parts[0].replace(numberStr, '').trim();
        const cpAndCity = parts[1].trim().split(' ');
        if(cpAndCity && cpAndCity.length == 2){
          const cp = parseInt(cpAndCity[0]);
          const city = cpAndCity[1];
          return {
            name: rawMember.nom,
            firstname: rawMember.prenom,
            address: {
              number: number,
              street: street,
              city: city,
              cp: cp
            },
            email: rawMember.email,
            memberType: rawMember.typeMembre,
            id: rawMember.id
          }
        }
      }
    }
    return {address:{}};
  }
}

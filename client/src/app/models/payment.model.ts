import {Address} from "./address.model";

export interface Payment {
  id?: string;
  orderId?: string;
  address?: Address;
  accountName?: string;
  cbNumber?: number;
  cbValidationCode?: number;
  cbExpirationDate?: string;
  accepted?: boolean;
}

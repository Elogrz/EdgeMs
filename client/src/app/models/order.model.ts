export interface Order {
  id?: string;
  clientId?: string;
  productOrderIds?: string[];
  date?: string;
  totalPrice?: number;
  isPaid?: boolean;
}

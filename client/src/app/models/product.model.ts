export interface Product {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  imageURL?: string;
  [key: string]: any;
}

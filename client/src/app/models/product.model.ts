export interface Product {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  imageUrl?: string;
  [key: string]: any;
}
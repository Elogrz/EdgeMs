export interface Address {
  number?: number;
  street?: string;
  city?: string;
  cp?: number;
  country?: string;
  [key: string]: any;
}

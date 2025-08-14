
export interface Product {
  _id: string; // MongoDB uses _id by default
  name: string;
  description: string;
  price: number;
  stock: number;
  label: string;
  image_url?: string;
}
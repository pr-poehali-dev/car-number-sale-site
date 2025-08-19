export interface LicensePlate {
  id: string;
  number: string;
  region: string;
  price: number;
  seller: string;
  phone: string;
  description: string;
  featured?: boolean;
  image?: string;
  dateAdded: string;
  views?: number;
  category?: string;
}
export interface Product {
  id: number | null;
  category: string;
  itemId: string;
  name: string;
  shortName: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number | null;
  image: string;
  count?: number;
}

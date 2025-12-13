export interface Product {
  id: number | null;
  category: "phones" | "tablets" | "accessories";
  itemId: string;
  name: string;
  shortName: string;
  fullPrice: number;
  price: number;
  screen: string;
  variant: string;
  color: string;
  ram: string;
  year: number | null;
  image: string;
  count?: number;
}

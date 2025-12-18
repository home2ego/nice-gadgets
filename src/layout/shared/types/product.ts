import type { Category } from "./category";

export interface Product {
  id: number | null;
  category: Category;
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

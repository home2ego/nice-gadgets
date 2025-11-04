import products from "@/api/products.json";
import type { Category } from "../types/category";
import type { Product } from "../types/product";

export const getProductsByCategory = (category: Category) => {
  return products.filter((product: Product) => product.category === category);
};

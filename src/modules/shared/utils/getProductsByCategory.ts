import products from "@/api/products.json";
import type { Product } from "../types/product";

type Category = "phones" | "tablets" | "accessories";

export const getProductsByCategory = (category: Category) => {
  return (products as Product[]).filter(
    (product) => product.category === category,
  );
};

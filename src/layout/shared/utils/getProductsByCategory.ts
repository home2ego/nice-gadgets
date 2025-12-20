import products from "@/api/products.json";
import type { Category } from "@/layout/shared/types/category";
import type { Product } from "@/layout/shared/types/product";

export const getProductsByCategory = (category: Category) => {
  return (products as Product[]).filter(
    (product) => product.category === category,
  );
};

import type { Product } from "@/layout/shared/types/product";
import type { SortOption } from "../../types/select";

export const getSortedProducts = (products: Product[], option: SortOption) => {
  const newProducts = [...products];

  switch (option) {
    case "newest":
      newProducts.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
      break;
    case "alpha":
      newProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "cheapest":
      newProducts.sort((a, b) => a.price - b.price);
  }

  return newProducts;
};

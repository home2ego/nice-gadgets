import type { SortOption } from "@/core/types/select";
import type { Product } from "@/modules/shared/types/product";

export const getSortedProducts = (products: Product[], option: SortOption) => {
  const newProducts = [...products];

  switch (option) {
    case "newest":
      newProducts.sort((a, b) => b.year - a.year);
      break;
    case "alpha":
      newProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "cheapest":
      newProducts.sort((a, b) => a.price - b.price);
  }

  return newProducts;
};

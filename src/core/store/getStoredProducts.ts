import type { Product } from "@/modules/shared/types/product";

export const getStoredProducts = (key: string): Product[] => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
};

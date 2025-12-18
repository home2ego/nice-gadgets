import type { Product } from "@/layout/shared/types/product";
import { exchangeRates } from "../shared/utils/priceUtils";
import { MIN_COUNT } from "./constants";

export function calculateCartTotals(cartProducts: Product[], lang: string) {
  const rate = exchangeRates[lang];

  return cartProducts.reduce(
    (acc, { price, count = MIN_COUNT }) => {
      const totalProduct = Math.round(price * count * rate);
      acc.totalSum += totalProduct;
      acc.totalCount += count;

      return acc;
    },
    { totalSum: 0, totalCount: 0 },
  );
}

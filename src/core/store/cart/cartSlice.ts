import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "@/layout/shared/types/product";
import { getStoredProducts } from "../getStoredProducts";

const cartSlice = createSlice({
  name: "cart",
  initialState: getStoredProducts("niceGadgetsCart"),
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.push({ ...action.payload, count: 1 });
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((product) => {
        return product.itemId === action.payload;
      });

      if (index !== -1) {
        state.splice(index, 1);
      }
    },

    clearCart: () => [],

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.find((product) => {
        return product.itemId === action.payload;
      });

      if (product?.count) {
        product.count += 1;
      }
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.find((product) => {
        return product.itemId === action.payload;
      });

      if (product?.count) {
        product.count -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

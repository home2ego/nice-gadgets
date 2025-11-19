import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "@/modules/shared/types/product";
import { getStoredProducts } from "../getStoredProducts";

const cartSlice = createSlice({
  name: "cart",
  initialState: getStoredProducts("niceGadgetsCart"),
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.push({ ...action.payload, count: 1 });
    },

    removeFromCart: (state, action: PayloadAction<Product>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        state.splice(index, 1);
      }
    },

    incrementQuantity: (state, action: PayloadAction<Product>) => {
      const item = state.find((item) => item.id === action.payload.id);

      if (item?.count) {
        item.count += 1;
      }
    },

    decrementQuantity: (state, action: PayloadAction<Product>) => {
      const item = state.find((item) => item.id === action.payload.id);

      if (item?.count) {
        item.count -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

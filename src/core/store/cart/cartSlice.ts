import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "@/modules/shared/types/product";

const storedCartProducts = (): Product[] => {
  const saved = localStorage.getItem("niceGadgetsCart");
  return saved ? JSON.parse(saved) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: storedCartProducts(),
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);

      localStorage.setItem("niceGadgetsCart", JSON.stringify(state));
    },

    removeFromCart: (state, action: PayloadAction<Product>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        state.splice(index, 1);

        localStorage.setItem("niceGadgetsCart", JSON.stringify(state));
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

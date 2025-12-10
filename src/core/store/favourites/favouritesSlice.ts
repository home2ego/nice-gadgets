import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "@/modules/shared/types/product";
import { getStoredProducts } from "../getStoredProducts";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: getStoredProducts("niceGadgetsFavourites"),
  reducers: {
    addToFavourites: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    },

    removeFromFavourites: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((product) => {
        return product.itemId === action.payload;
      });

      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addToFavourites, removeFromFavourites } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;

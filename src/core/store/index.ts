import { configureStore } from "@reduxjs/toolkit";
import type { Product } from "@/layout/shared/types/product";
import cartReducer from "./cart/cartSlice";
import favouritesReducer from "./favourites/favouritesSlice";
import themeReducer from "./theme/themeSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    cart: cartReducer,
    favourites: favouritesReducer,
  },
});

let prevCart: Product[] | null = null;
let prevFavs: Product[] | null = null;

store.subscribe(() => {
  const state = store.getState();

  if (state.cart !== prevCart) {
    localStorage.setItem("niceGadgetsCart", JSON.stringify(state.cart));
    prevCart = state.cart;
  }

  if (state.favourites !== prevFavs) {
    localStorage.setItem(
      "niceGadgetsFavourites",
      JSON.stringify(state.favourites),
    );
    prevFavs = state.favourites;
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

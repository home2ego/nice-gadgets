import { configureStore } from "@reduxjs/toolkit";
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

store.subscribe(() => {
  localStorage.setItem(
    "niceGadgetsCart",
    JSON.stringify(store.getState().cart),
  );
});

store.subscribe(() => {
  localStorage.setItem(
    "niceGadgetsFavourites",
    JSON.stringify(store.getState().favourites),
  );
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

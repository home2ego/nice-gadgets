import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import themeReducer from "./theme/themeSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

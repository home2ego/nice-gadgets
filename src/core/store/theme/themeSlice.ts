import { createSlice } from "@reduxjs/toolkit";

const storedTheme = localStorage.getItem("niceGadgetsTheme") ?? "dark";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: storedTheme,
  },
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.mode === "dark" ? "light" : "dark";

      state.mode = newTheme;

      localStorage.setItem("niceGadgetsTheme", newTheme);

      document.documentElement.classList.toggle("light-theme");
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

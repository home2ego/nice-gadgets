import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: true,
  },
  build: {
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [{ name: "react-vendor", test: /\/react(?:-dom)?/ }],
        },
      },
    },
  },
});

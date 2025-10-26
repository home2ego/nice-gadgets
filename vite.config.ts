import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // inject variables + mixins globally
        additionalData: '@use "@/styles/utils" as *;',
      },
    },
  },
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

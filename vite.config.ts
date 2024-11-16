import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: "/src/components",
      services: "/src/services",
      storeApi: "/src/services/storeApi",
      pages: "/src/pages",
      assets: "/src/assets",
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), compression()],
  build: {
    rollupOptions: {
      treeshake: true, 
      output: {
        entryFileNames: "assets/agora-ui-kit.js"
      }
    }
  }
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      treeshake: false, 
      output: {
        entryFileNames: "assets/agora-ui-kit.js"
      }
    }
  }
});

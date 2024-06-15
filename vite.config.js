import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // '/oldsoc': {
      //      target: 'https://sis.rutgers.edu/',
      //      changeOrigin: true,
      //      secure: false,      
      //      ws: true,
      //  }
  }
  },
});

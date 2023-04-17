import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 8080,
    proxy: {
      "/api": {
        // target: process.env.API_URL || "https://localhost:7097/api",
        target: "https://192.168.1.6:32768/api",
        // target: "https://192.168.1.6:32768/api",
        changeOrigin: true,
        // changeOrigin: false,
        // allow self-signed certificate
        secure: false,
        //disable cors
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

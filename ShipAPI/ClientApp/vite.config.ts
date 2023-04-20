/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
// console.log("isProduction", isProduction);

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    dangerouslyIgnoreUnhandledErrors: true,
    setupFiles: ["./src/__tests__/setupTests.ts"],
  },
  server: {
    host: true,
    strictPort: true,
    port: 8080,
    proxy: {
      "/api": {
        // target: process.env.API_URL || "https://localhost:7097/api",
        target: isProduction ? "https://shipapi:443/api" : "https://localhost:7097/api",

        // target: "https://192.168.1.6:443/api",
        changeOrigin: true,
        // changeOrigin: false,
        // allow self-signed certificate
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

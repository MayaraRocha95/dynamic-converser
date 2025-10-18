// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p,
      },
    },
  },
  build: {
    sourcemap: false, // desativa source maps no build
  },
  // opcional: para dev também (se quiser menos mensagens)
  esbuild: {
    sourcemap: false,
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,
    port: Number(process.env.FRONTEND_PORT) || 5173,
    watch: {
      usePolling: true,
      ignored: ["**/node_modules/**"],
    },
    hmr: {
      port: Number(process.env.FRONTEND_PORT) || 5173,
    },
  },
});

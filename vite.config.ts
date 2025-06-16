import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { rmSync } from "node:fs";
import { APP_ENV } from "./src/typings/env.d";

rmSync("dist", { recursive: true, force: true });
console.log(APP_ENV.WEB);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    __APP_ENV__: JSON.stringify(APP_ENV.WEB),
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    open: true,
    port: 3000,
    host: "0.0.0.0",
  },
});

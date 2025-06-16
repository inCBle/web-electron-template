import { rmSync } from "node:fs";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
import { APP_ENV } from "./src/typings/env.d";

// 先将dist、dist-electron、release文件夹强制删除在进行后续的打包流程
rmSync("dist", { recursive: true, force: true });
rmSync("dist-electron", { recursive: true, force: true });
rmSync("release", { recursive: true, force: true });

export default defineConfig({
  plugins: [
    vue(),
    electron([
      {
        entry: "electron/main.ts",
      },
      {
        entry: "electron/preload.ts",
      },
      {
        entry: "electron/loginPreload.ts",
      },
    ]),
  ],
  define: {
    __APP_ENV__: JSON.stringify(APP_ENV.ELECTRON),
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});

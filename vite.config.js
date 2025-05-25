import Components from "unplugin-vue-components/vite";
import vue from "@vitejs/plugin-vue";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import ViteFonts from "unplugin-fonts/vite";
import vueDevTools from "vite-plugin-vue-devtools";

import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

const host = process.env.TAURI_DEV_HOST;

export default defineConfig(async () => ({
  plugins: [
    vue(),
    vueDevTools(),
    Vuetify(),
    Components({
      dirs: ["src/assets/", "src/components/", "src/layouts/"],
    }),
    ViteFonts({
      google: {
        families: [
          {
            name: "Raleway",
            styles: "wght@100;300;400;500;700;900",
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ["vuetify"],
  },
  clearScreen: false,
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler",
      },
      scss: {
        api: "modern-compiler",
      },
    },
  },
}));

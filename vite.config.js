import { defineConfig } from "vite";
import { resolve } from "path";
export default defineConfig({
  base: "/",
  build: {
    lib: {
      entry: "src/main.ts",
      formats: ["umd"],
      name: "html-vue-setup",
      fileName: (format) => `main.${format}.js`,
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'vue': resolve(__dirname, 'public/script/vue.global.prod.js'),
    }
  }
});
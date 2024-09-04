import { defineConfig } from "vite";
import { resolve } from "path";
export default defineConfig({
  base: "/",
  build: {
    lib: {
      entry: "src/index.ts",
      // entry: "main.ts",
      formats: ["umd"],
      name: "Vue",
      fileName: (format) => `main.${format}.js`,
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      "@tools": resolve(__dirname, 'src/tools'),
      "@mode": resolve(__dirname, "src/mode"),
      "@Vue": resolve(__dirname,"@/assets/vue.global.prod.js")
    }
  },
});


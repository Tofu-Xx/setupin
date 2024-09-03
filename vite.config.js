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
    // rollupOptions: {
    //   // 确保将 Vue 作为外部依赖
    //   external: ['vue'],
    //   output: {
    //     globals: {
    //       vue: 'Vue'
    //     }
    //   }
    // }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
  // plugins: [vue()],
});


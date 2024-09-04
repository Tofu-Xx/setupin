import { defineConfig } from "vite";
import { resolve } from "path";
export default defineConfig({
  base: "/",
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["umd"],
      name: "Vue",
      fileName: (format) => `main.${format}.js`,
    },
  },
});


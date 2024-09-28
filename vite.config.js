import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['umd'],
      name: 'Vue',
      fileName: format => `main.${format}.js`,
    },
  },
})

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['umd'],
      name: 'Vue',
      fileName: () => 'main.js',
    },
    target: 'esnext',
    minify: false,
  },
})

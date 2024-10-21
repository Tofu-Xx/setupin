import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['iife'],
      name: 'Vue',
      fileName: () => 'main.js',
    },
  },
})

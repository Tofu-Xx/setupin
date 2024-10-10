import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['iife'],
      name: 'Vue',
      fileName: () => 'main.js',
    },
  },
})

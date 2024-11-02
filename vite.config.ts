import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.ts',
      formats: ['iife'],
      name: 'Vue',
      fileName: () => 'main.js',
    },
    target: 'esnext',
    minify: false,
  },
  envPrefix: 'VUE_',
})

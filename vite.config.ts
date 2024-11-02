import { defineConfig } from 'vite'

export default defineConfig({
  envPrefix: 'VUE_',
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
})

import { defineConfig } from 'vite'

export default defineConfig({
  envPrefix: 'VUE_',
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['iife'],
      name: 'Vue',
      fileName: () => 'main.js',
    },
    target: 'esnext',
    minify: false,
  },
})

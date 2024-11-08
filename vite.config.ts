import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    Vue(),
  ],
  build: {
    lib: {
      entry: '/src/main.ts',
      name: 'null',
      formats: ['iife'],
      fileName: 'main.js',
    },
  },
})

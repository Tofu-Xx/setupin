import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
      {
        find: /^vendor:(.*)$/,
        replacement: resolve(__dirname, 'vendor', `$1.esm${mode === 'production' ? '.prod' : ''}`),
      },
    ],
  },
  build: {
    outDir: `dist/${mode}`,
    lib: {
      entry: 'src/main.ts',
      formats: ['iife'],
      name: 'Vue',
      fileName: () => 'main.js',
    },
    target: 'esnext',
    minify: false,
  },
}))

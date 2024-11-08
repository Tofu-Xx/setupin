import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  publicDir: false,
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'ph_reponame',
      formats: ['iife'],
      fileName: () => 'main.js',
    },
    rollupOptions: {
      output: {
        generatedCode: {
          arrowFunctions: true,
          constBindings: true,
        },
      },
    },
    target: 'esnext',
    // chatset: 'utf-8',
    // minify: false,
    // sourcemap: true,
  },
  esbuild: {
    charset: 'ascii',
  },
})

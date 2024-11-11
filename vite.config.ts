import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  publicDir: false,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
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
    target: 'es2015',
    // minify: false,
    // sourcemap: true,
  },
  esbuild: {
    charset: 'ascii',
  },
})

import { defineConfig } from 'vite'

export default defineConfig({
  envPrefix: 'VUE_',
  build: {
    lib: {
      entry: {
        'main': 'src/index.ts',
        'main.prod': 'src/index.ts',
      },
      formats: ['iife'],
      name: 'Vue',
    },
    target: 'esnext',
    minify: false,
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
})

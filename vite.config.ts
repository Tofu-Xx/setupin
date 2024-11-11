import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  console.log(isDev)
  return {
    publicDir: false,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      __VUE_URL__: isDev
        ? '"https://unpkg.com/vue/dist/vue.runtime.esm-browser.js"'
        : '"https://unpkg.com/vue/dist/vue.runtime.esm-browser.prod.js"',
    },
    build: {
      lib: {
        entry: './src/main.ts',
        formats: ['iife'],
        fileName: () => isDev ? 'main.js' : 'main.prod.js',
        name: 'nill',
      },
      target: 'es2015',
      minify: !isDev,
      outDir: `dist/${mode}`,
    },
    esbuild: {
      charset: 'ascii',
    },
  }
})

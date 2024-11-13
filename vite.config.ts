import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  const suffix = isDev ? '' : '.prod'
  return {
    publicDir: false,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      __VUE_URL__: `"https://unpkg.com/vue@latest/dist/vue.runtime.esm-browser${suffix}.js"`,
      __IS_DEV__: isDev,
    },
    build: {
      lib: {
        entry: './src/main.ts',
        formats: ['iife'],
        fileName: () => `main${suffix}.js`,
        name: 'nill',
      },
      target: 'es2015',
      minify: !isDev,
      outDir: `dist/${mode}`,
    },
    esbuild: {
      charset: 'ascii',
      drop: isDev ? [] : ['debugger', 'console'],
    },
  }
})

import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
/* @rollup/plugin-babel */
// import babel from 'vite-plugin-babel'

export default defineConfig({
  plugins: [
    Vue(),
    // babel({
    //   babelConfig: {
    //     presets: ['@babel/preset-env'],
    //   },
    // })
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['umd'],
      name: 'Vue',
      fileName: () => 'main.js',
    },
    target: 'esnext',
    minify: false,
  },
})

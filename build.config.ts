import { resolve } from 'node:path'
import { defineBuildConfig, definePreset } from 'unbuild'

function base() {
  return definePreset({
    failOnWarn: false,
    entries: [{
      input: 'src/main.ts',
      name: 'main',
    }],
    alias: {
      '@': resolve(__dirname, 'src'),
      '@ascii-logo': resolve(__dirname, 'public/ascii-logo.txt'),
    },
    rollup: {
      inlineDependencies: true,
      output: {
        format: 'iife',
        name: 'Vue',
      },
      esbuild: {
        minify: true,
        sourcemap: true,
      },
    },
  })
}

export default defineBuildConfig([{
  preset: base(),
  declaration: true,
  replace: { __IS_PROD__: String(false) },
  alias: { '@vue': 'vue/dist/vue.esm-browser.js' },
  rollup: {
    output: {
      entryFileNames: '[name].js',
    },
  },
}, {
  preset: base(),
  declaration: false,
  replace: { __IS_PROD__: String(true) },
  alias: { '@vue': 'vue/dist/vue.esm-browser.prod.js' },
  rollup: {
    output: {
      entryFileNames: '[name].prod.js',
    },
  },
}])

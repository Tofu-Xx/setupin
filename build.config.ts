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
      output: {
        format: 'iife', // 指定输出格式为 iife
        name: 'Vue', // 全局变量名
      },
      esbuild: {
        // minify: true, // 是否压缩代码
        // sourcemap: true, // 是否生成 sourcemap
      },
    },

  })
}

export default defineBuildConfig([{
  preset: base(),
  replace: { __IS_PROD__: String(false) },
  // alias: { '@vue': 'vue/dist/vue.esm-browser.js' },
  rollup: {
    output: {
      entryFileNames: '[name].js',
    },
  },
}, {
  preset: base(),
  replace: { __IS_PROD__: String(true) },
  // alias: { '@vue': 'vue/dist/vue.esm-browser.prod.js' },
  rollup: {
    output: {
      entryFileNames: '[name].prod.js',
    },
  },
}])

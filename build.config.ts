import { resolve } from 'node:path'
import { defineBuildConfig, definePreset } from 'unbuild'

const base = definePreset({
  failOnWarn: false,
  declaration: true,
  entries: [{
    input: 'src/main.ts',
    name: 'main',
  }],
  alias: {
    '@': resolve(__dirname, 'src'),
    '@ascii-logo': resolve(__dirname, 'public/ascii-logo.txt'),
  },
  // externals: ['vue/compiler-sfc'], // 确保 vue/compiler-sfc 被视为外部依赖
  // externals: [],
  rollup: {
    output: {
      // globals: {
      //   'vue/compiler-sfc': 'compiler_sfc',
      // },
      format: 'iife', // 指定输出格式为 iife
      name: 'Vue', // 全局变量名
    },
    esbuild: {
      // minify: true, // 是否压缩代码
      // sourcemap: true, // 是否生成 sourcemap
    },
  },

})

export default defineBuildConfig([{
  preset: base,
  replace: { __IS_PROD__: String(false) },
  rollup: {
    output: {
      entryFileNames: '[name].js',
    },
  },
}, /* {
  preset: base,
  replace: { __IS_PROD__: String(true) },
  rollup: {
    output: {
      entryFileNames: '[name].prod.js',
    },
  },
} */])

import { resolve } from 'node:path'
import { defineBuildConfig, definePreset } from 'unbuild'

// process.env.NODE_ENV = 'production'
// const prod = process.env.NODE_ENV === 'production'
function base() {
  return definePreset({
    failOnWarn: false,
    // clean: true,
    // declaration: true,
    entries: [{
      input: 'src/main.ts',
      name: 'main',
    }],
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    rollup: {
    // emitCJS: false, // 是否输出 CommonJS 格式
      output: {
        format: 'iife', // 指定输出格式为 iife
        name: 'Vue', // 全局变量名
      // entryFileNames: '[name].prod.js', // 输出文件名
      // globals: {
      //   vue: 'Vue', // 例如，如果依赖 vue，可以将其映射为 Vue 的全局变量
      // },
      },
      esbuild: {
        minify: true, // 是否压缩代码
      // target: 'es2015', // 指定 esbuild 编译目标
      // sourcemap: true, // 是否生成 sourcemap
      },
    },

  })
}

export default defineBuildConfig([{
  preset: base(),
  replace: { __IS_PROD__: String(false) },
  alias: { '@vue': resolve(__dirname, 'vendor/vue.esm.js') },
  rollup: {
    output: {
      entryFileNames: '[name].js',
    },
  },
}, {
  preset: base(),
  replace: { __IS_PROD__: String(true) },
  alias: { '@vue': resolve(__dirname, 'vendor/vue.esm.prod.js') },
  rollup: {
    output: {
      entryFileNames: '[name].prod.js',
    },
  },
}])

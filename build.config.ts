import { resolve } from 'node:path'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  failOnWarn: false,
  // clean: true,
  // declaration: true,
  entries: [{
    input: 'src/main.ts',
    name: 'main',
  }],
  alias: {
    '@': resolve(__dirname, 'src'),
    '@vendor': resolve(__dirname, 'vendor'),
  },
  rollup: {
    // emitCJS: false, // 是否输出 CommonJS 格式
    output: {
      format: 'iife', // 指定输出格式为 iife
      name: 'MyGlobalLib', // 全局变量名
      entryFileNames: '[name].js', // 输出文件名
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

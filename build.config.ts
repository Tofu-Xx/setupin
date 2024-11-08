import { resolve } from 'node:path'
import vue from 'rollup-plugin-vue'
import { defineBuildConfig, definePreset } from 'unbuild'

const base = definePreset({
  failOnWarn: false,
  declaration: true,
  clean: true,
  entries: [{
    input: 'src/main.ts',
    name: 'main',
  }],
  alias: {
    '@': resolve(__dirname, 'src'),
    '@ascii-logo': resolve(__dirname, 'public/ascii-logo.txt'),
  },
  rollup: {
    // inlineDependencies: true, // 内联所有依赖
    // emitCJS: true, // 输出 CommonJS 格式
    // replace: {}, // 替换全局变量
    output: {
      // globals: {
      //   'vue/compiler-sfc': 'compiler_sfc',
      // },
      format: 'iife', // 指定输出格式为 iife
      name: 'Vue', // 全局变量名
      // interop: 'auto', // 自动处理依赖
      // dir: 'dist', // 输出目录
      // intro: '',
      // outro: '',
      // preserveModules: true, // 保留模块
      // interop: 'esModule', // 输出 esModule 格式
      // inlineDynamicImports: true, // 内联动态导入
    },
    esbuild: {
      // ignoreAnnotations: true, // 忽略类型注解
      // include: /\.[tj]s$/, // 仅打包 .ts 和 .js 文件
      // target: 'esnext', // 指定 esbuild 编译目标
      // minify: true, // 压缩输出代码
      // sourcemap: true, // 生成 sourcemap
    },
  },
  // peerDependencies: [], // 依赖的插件
  // dependencies: [], // 依赖的库
  // devDependencies: [], // 开发依赖
  // externals: [], // 外部依赖
  // hooks: {}, // 自定义插件
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

# https://github.com/vuejs/core/tree/main/packages/compiler-sfc



@vue/compiler-sfc

> @vue/compiler-sfc

Lower level utilities for compiling Vue Single File Components

> 用于编译Vue单文件组件的低级实用程序

Note: as of 3.2.13+, this package is included as a dependency of the main vue package and can be accessed as vue/compiler-sfc. This means you no longer need to explicitly install this package and ensure its version match that of vue's. Just use the main vue/compiler-sfc deep import instead.

> 注意：从3.2.13+开始，这个包作为主vue包的依赖项包含，可以作为vue/compiler-sfc访问。这意味着您不再需要显式安装此包并确保其版本与vue的版本匹配。只需使用主要的vue/compiler-sfc深度导入即可。



This package contains lower level utilities that you can use if you are writing a plugin / transform for a bundler or module system that compiles Vue Single File Components (SFCs) into JavaScript. It is used in vue-loader and @vitejs/plugin-vue.

> 如果你正在为一个打包器或模块系统编写插件/转换，将Vue单文件组件（sfc）编译成JavaScript，则可以使用该包包含的较低级实用程序。它在vue-loader和@vitejs/plugin-vue中使用。

API

> API

The API is intentionally low-level due to the various considerations when integrating Vue SFCs in a build system:

> API的设计意图是低级的，因为在集成Vue SFCs到构建系统时需要考虑各种因素：

Separate hot-module replacement (HMR) for script, template and styles

> 单独的热模块替换（HMR）用于脚本、模板和样式

template updates should not reset component state

> 模板更新不应重置组件状态

style updates should be performed without component re-render

> 样式更新应在不重新渲染组件的情况下执行

Leveraging the tool's plugin system for pre-processor handling. e.g. \<style lang="scss"\> should be processed by the corresponding webpack loader.

> 利用工具的插件系统进行预处理器处理。例如，\<style lang="scss"\>应由相应的webpack加载器处理。



In some cases, transformers of each block in an SFC do not share the same execution context. For example, when used with thread-loader or other parallelized configurations, the template sub-loader in vue-loader may not have access to the full SFC and its descriptor.

> 在某些情况下，SFC中的每个块的转换器都不共享相同的执行上下文。例如，在使用线程加载器或其他并行配置时，vue-loader中的模板子加载器可能没有访问完整的SFC和描述符。



The general idea is to generate a facade module that imports the individual blocks of the component. The trick is the module imports itself with different query strings so that the build system can handle each request as "virtual" modules:

> 一般的想法是生成一个外观模块，该模块导入组件的各个块。技巧是模块使用不同的查询字符串导入自身，以便构建系统可以将每个请求视为“虚拟”模块：


                                  Where the facade module looks like this:

> facade模块看起来像这样：



// main script

> //main script

import script from '/project/foo.vue?vue&type=script'

> 从'/project/foo.vue?vue&type=script'导入脚本

// template compiled to render function

> //模板编译为渲染函数

import { render } from '/project/foo.vue?vue&type=template&id=xxxxxx'

> 从'/project/foo.vue?vue&type=template&id=xxxxxx'导入渲染函数

// css

> //css

import '/project/foo.vue?vue&type=style&index=0&id=xxxxxx'

> 从'/project/foo.vue?vue&type=style&index=0&id=xxxxxx'导入css



// attach render function to script

> //将渲染函数附加到脚本

script.render = render

> script.render = render



// attach additional metadata

> // 附加其他元数据

// some of these should be dev only

> // 这些应该是开发人员专用的

script.__file = 'example.vue'

> script.__file = 'example.vue'

script.__scopeId = 'xxxxxx'

> script.__scopeId = 'xxxxxx'



// additional tooling-specific HMR handling code

> // 附加特定于工具的HMR处理代码

// using __VUE_HMR_API__ global

> // 使用__VUE_HMR_API__全局



export default script

> 导出默认值

High Level Workflow

> 高级工作流

In facade transform, parse the source into descriptor with the parse API and generate the above facade module code based on the descriptor;

> 在外观转换中，使用parse API解析源代码，并基于描述符生成上述外观模块代码；



In script transform, use compileScript to process the script. This handles features like \<script setup> and CSS variable injection. Alternatively, this can be done directly in the facade module (with the code inlined instead of imported), but it will require rewriting export default to a temp variable (a rewriteDefault convenience API is provided for this purpose) so additional options can be attached to the exported object.

> 在脚本转换中，使用compileScript处理脚本。这处理了诸如\<script setup>和CSS变量注入等特性。或者，可以直接在外观模块中（用内联代码而不是导入），但这将要求重写export default为临时变量（提供了一个rewriteDefault方便的API来实现），以便可以附加其他选项到导出的对象中。



In template transform, use compileTemplate to compile the raw template into render function code.

> 在模板转换中，使用compileTemplate编译原始模板代码为渲染函数代码。



In style transform, use compileStyle to compile raw CSS to handle \<style scoped>, \<style module> and CSS variable injection.

> 在样式转换中，使用compileStyle编译原始CSS代码以处理\<style scoped>、\<style module>和CSS变量注入。



Options needed for these APIs can be passed via the query string.

> 这些API需要的选项可以通过查询字符串传递。



For detailed API references and options, check out the source type definitions. For actual usage of these APIs, check out @vitejs/plugin-vue or vue-loader.

> 详细的API参考和选项，请查看源类型定义。有关这些API的实际用法，请查看@vitejs/plugin-vue或vue-loader。
import * as compilerSfc from 'vue/compiler-sfc'
import { compiler } from './compiler'
import { getSource } from './getSource'

import { watchRoot } from './utils';

(async () => {
  const sources = await watchRoot(getSource)
  console.log(sources.join('\n'))
  compiler(sources.join('\n'))
})()

console.log(compilerSfc)

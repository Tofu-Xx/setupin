// import * as compilerSfc from 'vue/compiler-sfc'
import { compiler } from './compiler'
import { getSource } from './getSource'
import { watchRoot } from './utils';

(async () => {
  const sources = await watchRoot(getSource)
  const { sfcScriptBlock, sfcStyleCompileResultsList, sfcTemplateCompileResults } = compiler(sources.join('\n'))
  console.log(sfcScriptBlock)
  console.log(sfcStyleCompileResultsList)
  console.log(sfcTemplateCompileResults)
  const styleCode = sfcStyleCompileResultsList.map(style => style.code).join('\n')
  const styleEl = document.createElement('style')
  styleEl.dataset.setupin = ''
  styleEl.innerHTML = styleCode
  document.head.appendChild(styleEl)
  document.body.innerHTML = sfcTemplateCompileResults.source
  // console.log(compiled)
})()

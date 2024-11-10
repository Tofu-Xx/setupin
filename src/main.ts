import { MagicString } from 'vue/compiler-sfc'
import { compiler } from './compiler'
import { getSource } from './getSource'
import { watchRoot } from './utils';

(async () => {
  const sources = await watchRoot(getSource)
  const { sfcScriptBlock, sfcStyleCompileResultsList, sfcTemplateCompileResults } = compiler(sources.join('\n'))
  // console.log(sfcScriptBlock)
  // console.log(sfcStyleCompileResultsList)
  // console.log(sfcTemplateCompileResults)
  /* template */
  document.body.innerHTML = sfcTemplateCompileResults.source
  /* style */
  const styleCode = sfcStyleCompileResultsList.map(style => style.code).join('\n')
  const styleEl = document.createElement('style')
  styleEl.innerHTML = styleCode
  document.head.appendChild(styleEl)
  /* script */
  const s = new MagicString(sfcScriptBlock.content)
  s.replace('export default', 'const App =')
  console.log(s.toString())
})()

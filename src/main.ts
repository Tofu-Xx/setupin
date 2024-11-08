import { compileScript, compileStyle, compileTemplate, parse } from 'vue/compiler-sfc'
import { source } from './source'

const id = 'setupin'
const filename = 'App.vue'
const parsed = parse(source)
const SFCScriptBlock = compileScript(parsed.descriptor, { id })
const SFCTemplateCompileResults = compileTemplate({
  id,
  filename,
  source: parsed.descriptor.template?.content ?? '',
})
const SFCStyleCompileResultsList = parsed.descriptor.styles.map((style) => {
  return compileStyle({
    id,
    filename,
    source: style.content,
  })
})
// console.log(SFCScriptBlock.content)
// console.log(SFCTemplateCompileResults.code)
// console.log(SFCStyleCompileResultsList.map(style => style.code).join('\n'))
// console.log('styles', compileredStyles)

export default SFCScriptBlock.content
  + SFCTemplateCompileResults.code
  + SFCStyleCompileResultsList.map(style => style.code).join('\n')

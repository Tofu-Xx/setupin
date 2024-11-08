import { compileScript, compileStyle, compileTemplate, parse } from 'vue/compiler-sfc'
import { source } from './source'

const id = 'setupin'
const filename = 'App.vue'
const parsed = parse(source, { filename })
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
    scoped: style.scoped,
  })
})
console.log(SFCScriptBlock.content)
console.log(SFCTemplateCompileResults.code)
console.log(SFCStyleCompileResultsList.map(style => style.code).join('\n'))

export default SFCScriptBlock.content
  + SFCTemplateCompileResults.code
  + SFCStyleCompileResultsList.map(style => style.code).join('\n')

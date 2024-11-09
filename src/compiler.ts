import { compileScript, compileStyle, compileTemplate, parse } from 'vue/compiler-sfc'

export function compiler(source: string) {
  const filename = 'setupin'
  const id = 'setupin'
  const parsed = parse(source, { filename })
  console.log(parsed)
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
  console.log(SFCScriptBlock)
  console.log(SFCTemplateCompileResults)
  console.log(SFCStyleCompileResultsList)
}
// export default SFCScriptBlock.content
//   + SFCTemplateCompileResults.code
//   + SFCStyleCompileResultsList.map(style => style.code).join('\n')

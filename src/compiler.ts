import { compileScript, compileStyle, compileTemplate, parse } from 'vue/compiler-sfc'

export function compiler(source: string) {
  const filename = 'setupin'
  const id = 'setupin'
  const sfcParseResult = parse(source, { filename })
  const sfcScriptBlock = compileScript(sfcParseResult.descriptor, { id })
  const sfcTemplateCompileResults = compileTemplate({
    id,
    filename,
    source: sfcParseResult.descriptor.template?.content ?? '',
  })
  const sfcStyleCompileResultsList = sfcParseResult.descriptor.styles.map((style) => {
    return compileStyle({
      id,
      filename,
      source: style.content,
      scoped: style.scoped,
    })
  })
  return {
    sfcScriptBlock,
    sfcTemplateCompileResults,
    sfcStyleCompileResultsList,
  }
}

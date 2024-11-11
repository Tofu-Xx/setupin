import { REPO_NAME } from '@/data'
import { compileScript, compileStyle, compileTemplate, parse } from 'vue/compiler-sfc'

const filename = `${REPO_NAME}.vue`
const id = REPO_NAME
export function compilerSfc(source: string) {
  const sfcParseResult = parse(source, { filename })
  // console.log(sfcParseResult)
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

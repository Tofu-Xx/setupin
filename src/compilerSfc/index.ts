import { RepoName } from '@/data'
import { compileScript, compileStyle, compileTemplate, parse } from 'vue/compiler-sfc'

const filename = `${RepoName}.vue`
const id = RepoName
export function compilerSfc(source: string) {
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

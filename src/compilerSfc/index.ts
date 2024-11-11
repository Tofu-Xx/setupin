import type { SFCParseOptions } from 'vue/compiler-sfc'
import { INIT_CODE, REPO_NAME } from '@/data'
import { compileScript, compileStyle, compileTemplate, parse } from 'vue/compiler-sfc'

const filename = `${REPO_NAME}.vue`
const id = REPO_NAME
export function compilerSfc(source: string) {
  const sfcParseResult = parse(INIT_CODE + source, { filename })
  // console.log(sfcParseResult.descriptor)
  // console.log(...sfcParseResult.errors)
  /* */
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

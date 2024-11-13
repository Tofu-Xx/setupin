import type { SFCScriptBlock, SFCStyleCompileResults, SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { REPO_NAME } from '@/data'
import { compileScript, compileStyle, compileTemplate, parse } from '@vue/compiler-sfc'

const filename = `${REPO_NAME}.vue`
const id = REPO_NAME
export interface CompiledSFC {
  sfcStyleCompileResultsList: SFCStyleCompileResults[]
  sfcScriptBlock: SFCScriptBlock
  sfcTemplateCompileResults: SFCTemplateCompileResults
}
export function compilerSfc(source: string): CompiledSFC {
  const sfcParseResult = parse(source, { filename })
  sfcParseResult.errors.forEach((e) => {
    console.warn(e)
  })
  /* style */
  const sfcStyleCompileResultsList = sfcParseResult.descriptor.styles.map((style) => {
    const sfcStyleCompileResults = compileStyle({
      id,
      filename,
      source: style.content,
      scoped: style.scoped,
      isProd: !__IS_DEV__,
    })
    sfcStyleCompileResults.errors.forEach((e) => {
      console.warn(e)
    })
    return sfcStyleCompileResults
  })
  // const hasScoped = sfcParseResult.descriptor.styles.some(s => s.scoped)
  /* script */
  const sfcScriptBlock = compileScript(sfcParseResult.descriptor, {
    id,
    isProd: !__IS_DEV__,
  })
  /* template */
  const sfcTemplateCompileResults = compileTemplate({
    id,
    filename,
    source: sfcParseResult.descriptor.template?.content ?? '',
    isProd: !__IS_DEV__,
  })
  sfcTemplateCompileResults.errors.forEach((e) => {
    console.warn(e)
  })
  return {
    sfcStyleCompileResultsList,
    sfcScriptBlock,
    sfcTemplateCompileResults,
  }
}

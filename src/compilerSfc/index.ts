import type { SFCScriptBlock, SFCStyleCompileResults, SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { REPO_NAME } from '@/data'
import { compileScript, compileStyle, compileTemplate, parse } from '@vue/compiler-sfc'

export type SFCAppBlock = SFCScriptBlock & { isScoped?: boolean }
export interface CompiledSFC {
  sfcStyleCompileResultsList: SFCStyleCompileResults[]
  sfcAppBlock: SFCAppBlock
  sfcTemplateCompileResults: SFCTemplateCompileResults
}
export function compilerSfc(source: string): CompiledSFC {
  const id = REPO_NAME
  const filename = `${REPO_NAME}.vue`
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
  /* script */
  const sfcAppBlock: SFCAppBlock = compileScript(sfcParseResult.descriptor, {
    id,
    isProd: !__IS_DEV__,
  })
  sfcAppBlock.isScoped = sfcParseResult.descriptor.styles.some(s => s.scoped)
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
    sfcAppBlock,
    sfcTemplateCompileResults,
  }
}

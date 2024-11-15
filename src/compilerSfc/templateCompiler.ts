import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import type { Info } from './types'
import { compileTemplate } from '@vue/compiler-sfc'

export function templateCompiler(template: SFCTemplateBlock | null, info: Info) {
  const sfcTemplateCompileResults = compileTemplate({
    ...info,
    source: template?.content ?? '',
    isProd: !__IS_DEV__,
  })
  sfcTemplateCompileResults.errors.forEach(e => console.warn(e))
  return sfcTemplateCompileResults
}

import type { SFCStyleBlock } from '@vue/compiler-sfc'
import type { CompiledSFC, SFCAppBlock } from './types'
import { REPO_NAME } from '@/data'
import { compileScript, compileStyle, compileTemplate, parse } from '@vue/compiler-sfc'
import { appCompiler } from './appCompiler'
import { stylesCompiler } from './stylesCompiler'
import { templateCompiler } from './templateCompiler'

export function compilerSfc(source: string): CompiledSFC {
  const info = { id: REPO_NAME, filename: `${REPO_NAME}.vue` }
  const { descriptor, errors } = parse(source, info)
  errors.forEach(e => console.warn(e))
  return {
    sfcStyleCompileResultsList: stylesCompiler(descriptor.styles, info),
    sfcAppBlock: appCompiler(descriptor, info),
    sfcTemplateCompileResults: templateCompiler(descriptor.template, info),
  }
}

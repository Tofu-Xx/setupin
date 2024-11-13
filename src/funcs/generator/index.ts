import type { CompiledSFC } from '@/compilerSfc'
import { generateCssCode } from './generateCssCode'
import { generateEsmCode } from './generateEsmCode'

export function generator(compiledSfc: CompiledSFC) {
  const { sfcScriptBlock, sfcStyleCompileResultsList, sfcTemplateCompileResults } = compiledSfc
  return {
    esmCode: generateEsmCode(sfcScriptBlock, sfcTemplateCompileResults),
    cssCode: generateCssCode(sfcStyleCompileResultsList),
  }
}

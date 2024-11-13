import type { CompiledSFC } from '@/compilerSfc'
import { generateCssCode } from './generateCssCode'
import { generateEsmCode } from './generateEsmCode'

export function generator(compiledSfc: CompiledSFC) {
  const { sfcAppBlock, sfcStyleCompileResultsList, sfcTemplateCompileResults } = compiledSfc
  return {
    esmCode: generateEsmCode(sfcAppBlock, sfcTemplateCompileResults),
    cssCode: generateCssCode(sfcStyleCompileResultsList),
  }
}

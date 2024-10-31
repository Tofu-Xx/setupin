import { parse } from '@babel/parser'
import { extractImport } from './extractImport'
import { getGlobalVars } from './getGlobalVars'

export function ast(code: string) {
  const astBody = parse(code, { sourceType: 'module' }).program.body
  return {
    getGlobalVars: () => getGlobalVars(astBody),
    extractImport: () => extractImport(astBody, code),
  }
}

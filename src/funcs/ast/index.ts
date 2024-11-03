import { parse } from '@babel/parser'
import { extractImport } from './extractImport'
import { getGlobalVars } from './getGlobalVars'
import { isAsyncModule } from './isAsyncModule'

export function ast(code: string) {
  const astBody = parse(code, { sourceType: 'module' }).program.body
  return {
    extractImport: () => extractImport(astBody, code),
    isAsyncModule: () => isAsyncModule(astBody),
    getGlobalVars: () => getGlobalVars(astBody),
  }
}

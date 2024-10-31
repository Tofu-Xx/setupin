import type { Statement } from '@babel/types'

export function extractImport(astBody: Statement[], code: string) {
  const imports = astBody.filter(({ type }) => type === 'ImportDeclaration').map(node => code.slice(node.start!, node.end!))
  return {
    importText: imports.join('\n'),
    setupText: code.replace(new RegExp(imports.join('|'), 'g'), ''),
  }
}

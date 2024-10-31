import type { Statement } from '@babel/types'

export function extractImport(astBody: Statement[], code: string) {
  const imports = astBody.filter(({ type }) => type === 'ImportDeclaration').map(node => code.slice(node.start!, node.end!))
  return {
    importCode: imports.join('\n'),
    setupCode: code.replace(new RegExp(imports.join('|'), 'g'), ''),
  }
}

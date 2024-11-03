import type { ExpressionStatement, Statement, VariableDeclaration } from '@babel/types'
import { when } from '@/tools'

export function isAsyncModule(astBody: Statement[]) {
  return astBody.some(node => when(node, node.type)({
    ExpressionStatement: (n: ExpressionStatement) => n.expression.type === 'AwaitExpression',
    VariableDeclaration: (n: VariableDeclaration) => n.declarations.some(declaration => declaration.init?.type === 'AwaitExpression'),
  }))
}
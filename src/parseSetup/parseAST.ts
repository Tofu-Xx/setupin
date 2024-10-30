import type { ArrayPattern, AssignmentPattern, FunctionDeclaration, Identifier, LVal, ObjectPattern, ObjectProperty, Pattern, RestElement, Statement, VariableDeclaration } from '@babel/types'
import { parse } from '@babel/parser'
import { when } from '../tools'

export function getGlobalVars(astBody: Statement[]): string[] {
  return astBody.flatMap(node => when(node, node.type)({
    FunctionDeclaration: ({ id }: FunctionDeclaration) => [id?.name ?? ''],
    VariableDeclaration: (n: VariableDeclaration) => n.declarations.flatMap(({ id }) => _patterner(id)),
  }))

  function _patterner(pattern: LVal): string[] {
    const RestElement = (p: RestElement) => _patterner(p.argument)
    return when(pattern, pattern?.type)({
      Identifier: (p: Identifier) => [p.name],
      AssignmentPattern: (p: AssignmentPattern) => _patterner(p.left),
      ObjectPattern: (p: ObjectPattern) =>
        p.properties.flatMap(prop => when(prop, prop.type)({
          ObjectProperty: (p: ObjectProperty) => _patterner(p.value as LVal),
          RestElement,
        }), []),
      ArrayPattern: (p: ArrayPattern) =>
        p.elements.flatMap(element => when(element, element?.type ?? 0)({
          0: () => [],
          RestElement,
          [Symbol('default')]: (el: Pattern) => _patterner(el),
        })),
    })
  }
}

export function getASTBody(code: string) {
  return parse(code, { sourceType: 'script' }).program.body
}

import type { ArrayPattern, AssignmentPattern, FunctionDeclaration, Identifier, LVal, ObjectPattern, ObjectProperty, Pattern, RestElement, VariableDeclaration } from '@babel/types'
import { parse } from '@babel/parser'
import { when } from '../tools'

export function getGlobalVars(code: string): string[] {
  const ast = parse(code, { sourceType: 'script' })

  return ast.program.body.flatMap(node => when(node, node.type)({
    FunctionDeclaration: ({ id }: FunctionDeclaration) => [id?.name ?? ''],
    VariableDeclaration: (n: VariableDeclaration) => n.declarations.flatMap(({ id }) => patterner(id)),
  }))

  function patterner(pattern: LVal): string[] {
    return when(pattern, pattern?.type)(() => {
      const RestElement = (p: RestElement) => patterner(p.argument)
      return {
        Identifier: (p: Identifier) => [p.name],
        AssignmentPattern: (p: AssignmentPattern) => patterner(p.left),
        ObjectPattern: (p: ObjectPattern) =>
          p.properties.flatMap(prop => when(prop, prop.type)({
            ObjectProperty: (p: ObjectProperty) => patterner(p.value as LVal),
            RestElement,
          }), []),
        ArrayPattern: (p: ArrayPattern) =>
          p.elements.flatMap(element => when(element, element?.type ?? 0)({
            0: () => [],
            RestElement,
            [Symbol('default')]: (el: Pattern) => patterner(el),
          })),
      }
    })
  }
}

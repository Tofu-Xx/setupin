import type { ArrayPattern, AssignmentPattern, FunctionDeclaration, Identifier, LVal, ObjectPattern, ObjectProperty, Pattern, RestElement, VariableDeclaration } from '@babel/types'
import { parse } from '@babel/parser'
import { Vue } from './assets/vue'
import { when } from './tools'

export function parseSetup(setupScript: HTMLScriptElement) {
  const setupText = setupScript.textContent ?? ''
  setupScript.remove()
  return {
    setup: new Function(`const { ${Object.keys(Vue)} } = Vue; ${setupText} return { ${getGlobalVars(setupText)} }`),
  }
}

function getGlobalVars(code: string): string[] {
  const ast = parse(code, { sourceType: 'script' })

  return ast.program.body.flatMap(node => when(node, node.type)({
    ImportDeclaration() { throw new Error('Cannot use import statement outside a module.') },
    FunctionDeclaration: ({ id }: FunctionDeclaration) => [id?.name ?? ''],
    VariableDeclaration: (n: VariableDeclaration) => n.declarations.flatMap(({ id }) => patterner(id)),
  }))

  function patterner(pattern: LVal): string[] {
    const RestElement = (p: RestElement) => patterner(p.argument)
    return when(pattern, pattern?.type)({
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
    })
  }
}

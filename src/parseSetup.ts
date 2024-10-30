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

  return ast.program.body.reduce((prev: string[], node) => {
    when(node, node.type)({
      ImportDeclaration() { throw new Error('Cannot use import statement outside a module.') },
      FunctionDeclaration({ id }: FunctionDeclaration) {
        prev.push(id?.name ?? '')
      },
      VariableDeclaration(n: VariableDeclaration) {
        for (const { id } of n.declarations)
          prev.push(...patterner(id))
      },
    })
    return prev
  }, [])

  function patterner(pattern: LVal): string[] {
    const rest = (vars: string[]) => ({ RestElement: (p: RestElement) => vars.concat(patterner(p.argument)) })
    return when(pattern, pattern?.type)({
      Identifier: (p: Identifier) => [p.name],
      AssignmentPattern: (p: AssignmentPattern) => patterner(p.left),
      ObjectPattern(p: ObjectPattern) {
        return p.properties.reduce((prev: string[], prop) => {
          return when(prop, prop.type)({
            ObjectProperty: (p: ObjectProperty) => prev.concat(patterner(p.value as LVal)),
            ...rest(prev),
          })
        }, [])
      },
      ArrayPattern(p: ArrayPattern) {
        return p.elements.reduce((prev: string[], element) => {
          return when(element, element?.type ?? 0)({
            0: () => prev,
            ...rest(prev),
            [Symbol('default')]: (el: Pattern) => prev.concat(patterner(el)),
          })
        }, [])
      },
    })
  }
}

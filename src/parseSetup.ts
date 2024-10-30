import type { ArrayPattern, AssignmentPattern, FunctionDeclaration, Identifier, LVal, ObjectPattern, ObjectProperty, Pattern, RestElement, VariableDeclaration } from '@babel/types'
import { parse } from '@babel/parser'
import { Vue } from './assets/vue'
import { when } from './tools'

export function parseSetup(setupScript: HTMLScriptElement) {
  const setupText = setupScript.textContent ?? ''
  setupScript.remove()
  const vars = getGlobalVars(setupText)
  return {
    setup: new Function(`const { ${Object.keys(Vue).join(',')} } = Vue; ${setupText} return { ${vars} }`),
  }
}

function getGlobalVars(code: string): string[] {
  const ast = parse(code, { sourceType: 'script' })
  // 通用的模式处理函数
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
    return when(pattern, pattern?.type)({
      ObjectPattern(p: ObjectPattern) {
        return p.properties.reduce((prev: string[], prop) => {
          return when(prop, prop.type)({
            ObjectProperty(p: ObjectProperty) {
              return prev.concat(patterner(p.value as LVal))
            },
            RestElement(p: RestElement) {
              return prev.concat(patterner(p.argument))
            },
          })
        }, [])
      },
      ArrayPattern(p: ArrayPattern) {
        return p.elements.reduce((prev: string[], element) => {
          return when(element, element?.type ?? 0)({
            0: () => prev,
            RestElement(p: RestElement) {
              return prev.concat(patterner(p.argument))
            },
            [Symbol('default')](el: Pattern) {
              return prev.concat(patterner(el))
            },
          })
        }, [])
      },
      Identifier(p: Identifier) {
        return [p.name]
      },
      AssignmentPattern(p: AssignmentPattern) {
        return patterner(p.left)
      },
    })
  }
}

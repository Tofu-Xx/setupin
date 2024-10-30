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
          // patterner(id, prev)
          prev.push(...patterner(id))
      },
    })
    return prev
  }, [])
  function patterner(pattern: LVal): string[] {
    const vars: string[] = []
    when(pattern, pattern?.type)({
      ObjectPattern(p: ObjectPattern) {
        for (const prop of p.properties) {
          when(prop, prop.type)({
            ObjectProperty(p: ObjectProperty) {
              vars.push(...patterner(p.value as LVal))
            },
            RestElement(p: RestElement) {
              vars.push(...patterner(p.argument))
            },
          })
        }
      },
      ArrayPattern(p: ArrayPattern) {
        for (const element of p.elements) {
          element && when(element, element?.type)({
            RestElement(p: RestElement) {
              vars.push(...patterner(p.argument))
            },
            [Symbol('default')](el: Pattern) {
              vars.push(...patterner(el))
            },
          })
        }
      },
      Identifier(p: Identifier) {
        vars.push(p.name)
      },
      AssignmentPattern(p: AssignmentPattern) {
        vars.push(...patterner(p.left))
      },
    })
    return vars
  }
}

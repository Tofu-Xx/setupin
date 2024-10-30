import type { ArrayPattern, AssignmentPattern, FunctionDeclaration, Identifier, ObjectPattern, ObjectProperty, Pattern, RestElement, VariableDeclaration } from '@babel/types'
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
  function patterner(pattern: Pattern | Identifier, vars: string[]) {
    when(pattern, pattern?.type)({
      ObjectPattern(p: ObjectPattern) {
        for (const prop of p.properties) {
          if (prop.type === 'ObjectProperty') {
            patterner(prop.value as Pattern, vars)
          }
          else if (prop.type === 'RestElement') {
            patterner(prop.argument as Pattern, vars)
          }
        }
      },
      ArrayPattern(p: ArrayPattern) {
        for (const element of p.elements) {
          if (element?.type === 'RestElement') {
            patterner(element.argument as Pattern, vars)
          }
          else if (element) {
            patterner(element, vars)
          }
        }
      },
      Identifier(p: Identifier) {
        vars.push(p.name)
      },
      AssignmentPattern(p: AssignmentPattern) {
        // p.left.type === 'Identifier' && vars.push(p.left.name)
        patterner(p.left, vars)
      },
    })
  }
  return ast.program.body.reduce((prev: string[], node) => {
    when(node, node.type)({
      ImportDeclaration() { throw new Error('Cannot use import statement outside a module.') },
      FunctionDeclaration(n: FunctionDeclaration) {
        prev.push(n.id?.name ?? '')
      },
      VariableDeclaration(n: VariableDeclaration) {
        for (const { id } of n.declarations) {
          patterner(id, prev)
          // when(id, id.type)({
          //   ObjectPattern(id: ObjectPattern) { patterner(id, prev) },
          //   ArrayPattern(id: ArrayPattern) { patterner(id, prev) },
          //   Identifier(id: Identifier) { prev.push(id.name) },
          // })
        }
      },
    })
    return prev
  }, [])
}

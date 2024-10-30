import { parse } from '@babel/parser'
import { Vue } from './assets/vue'
import { when } from './tools'

export function parseSetup(setupScript: HTMLScriptElement) {
  const setupText = setupScript.textContent ?? ''
  setupScript.remove()
  return {
    setup: new Function(`const { ${Object.keys(Vue).join(',')} } = Vue; ${setupText} return { ${getGlobalVars(setupText)} }`),
  }
}

function getGlobalVars(code: string): string[] {
  const ast = parse(code, { sourceType: 'script' })
  // 通用的模式处理函数
  function patterner(pattern: any, vars: string[]) {
    when(pattern?.type)({
      ObjectPattern() {
        for (const { value } of pattern.properties)
          patterner(value, vars)
      },
      ArrayPattern() {
        for (const element of pattern.elements)
          patterner(element, vars)
      },
      Identifier() {
        vars.push(pattern.name)
      },
      AssignmentPattern() {
        pattern.left.type === 'Identifier' && vars.push(pattern.left.name)
      },
    })
  }

  return ast.program.body.reduce((prev: string[], node: any) => {
    when(node.type)({
      ImportDeclaration() { throw new Error('Cannot use import statement outside a module.') },
      FunctionDeclaration() { prev.push(node.id.name) },
      VariableDeclaration() {
        for (const { id } of node.declarations) {
          when(id.type)({
            ObjectPattern() { patterner(id, prev) },
            ArrayPattern() { patterner(id, prev) },
            Identifier() { prev.push(id.name) },
          })
        }
      },
    })
    return prev
  }, [])
}

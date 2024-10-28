import { parse } from '@babel/parser'
import { when } from './tools.ts'

export function parseSetup(setupScript: HTMLScriptElement) {
  const setupText = setupScript.textContent ?? ''
  setupScript.remove()
  return {
    setup: new Function(`for (const k in Vue) window[k] = Vue[k]; ${setupText} return { ${getGlobalVars(setupText)} }`),
  }
}

function getGlobalVars(code: string): string[] {
  const ast = parse(code, {
    sourceType: 'script',
    plugins: ['typescript'],
  })

  // 检查是否存在 import 语句
  const hasImport = ast.program.body.some(node => node.type === 'ImportDeclaration')
  if (hasImport) {
    throw new Error('Cannot use import statement outside a module.')
  }

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

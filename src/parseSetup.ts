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
  function patterner(pattern: any, variables: string[]) {
    // if (!pattern)
    //   return

    // switch (pattern.type) {
    //   case 'ObjectPattern':
    //     pattern.properties.forEach((prop: any) => {
    //       patterner(prop.value, variables)
    //     })
    //     break

    //   case 'ArrayPattern':
    //     pattern.elements.forEach((element: any) => {
    //       patterner(element, variables)
    //     })
    //     break

    //   case 'Identifier':
    //     variables.push(pattern.name)
    //     break

    //   case 'AssignmentPattern':
    //     if (pattern.left.type === 'Identifier') {
    //       variables.push(pattern.left.name)
    //     }
    //     break
    // }
    when(pattern?.type)({
      ObjectPattern() {
        //     pattern.properties.forEach((prop: any) => {
        //     })
        for (const prop of pattern.properties)
          patterner(prop.value, variables)
      },
      ArrayPattern() {
        for (const element of pattern.elements)
          patterner(element, variables)
      },
      Identifier() {
        variables.push(pattern.name)
      },
      AssignmentPattern() {
        if (pattern.left.type === 'Identifier') {
          variables.push(pattern.left.name)
        }
      },
    })
  }

  return ast.program.body.reduce((variables: string[], node: any) => {
    // 处理变量声明
    if (node.type === 'VariableDeclaration') {
      for (const declaration of node.declarations) {
        if (declaration.id.type === 'ObjectPattern') {
          patterner(declaration.id, variables)
        }
        // 处理数组解构赋值
        else if (declaration.id.type === 'ArrayPattern') {
          patterner(declaration.id, variables)
        }
        // 处理普通变量声明
        else if (declaration.id.type === 'Identifier') {
          variables.push(declaration.id.name)
        }
      }
    }
    // 处理函数声明
    else if (node.type === 'FunctionDeclaration' && node.id) {
      variables.push(node.id.name)
    }
    return variables
  }, [])
}

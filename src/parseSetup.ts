import { parse } from '@babel/parser'

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

  // 辅助函数：处理对象解构模式
  function objectPatterner(pattern: any, variables: string[]) {
    pattern.properties.forEach((prop: any) => {
      // 如果值是嵌套的对象解构
      if (prop.value.type === 'ObjectPattern') {
        objectPatterner(prop.value, variables)
      }
      // 如果是带默认值的解构
      else if (prop.value.type === 'AssignmentPattern') {
        variables.push(prop.value.left.name)
      }
      // 普通解构
      else {
        variables.push(prop.value.name)
      }
    })
  }

  // 辅助函数：处理数组解构模式
  function arrayPatterner(pattern: any, variables: string[]) {
    pattern.elements.forEach((element: any) => {
      if (!element)
        return // 跳过空元素

      if (element.type === 'Identifier') {
        variables.push(element.name)
      }
      else if (element.type === 'ArrayPattern') {
        arrayPatterner(element, variables)
      }
      // 可以在这里添加其他类型的处理，比如对象解构
      else if (element.type === 'ObjectPattern') {
        objectPatterner(element, variables)
      }
    })
  }

  return ast.program.body.reduce((variables: string[], node: any) => {
    // 处理变量声明
    if (node.type === 'VariableDeclaration') {
      node.declarations.forEach((declaration: any) => {
        // 处理对象解构赋值
        if (declaration.id.type === 'ObjectPattern') {
          objectPatterner(declaration.id, variables)
        }
        // 处理数组解构赋值
        else if (declaration.id.type === 'ArrayPattern') {
          arrayPatterner(declaration.id, variables)
        }
        // 处理普通变量声明
        else if (declaration.id.type === 'Identifier') {
          variables.push(declaration.id.name)
        }
      })
    }
    // 处理函数声明
    else if (node.type === 'FunctionDeclaration' && node.id) {
      variables.push(node.id.name)
    }
    return variables
  }, [])
}

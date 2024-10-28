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
      const value = prop.value
      // 处理嵌套的数组解构
      if (value.type === 'ArrayPattern') {
        arrayPatterner(value, variables)
      }
      // 处理嵌套的对象解构
      else if (value.type === 'ObjectPattern') {
        objectPatterner(value, variables)
      }
      // 处理带默认值的解构
      else if (value.type === 'AssignmentPattern') {
        variables.push(value.left.name)
      }
      // 普通解构
      else if (value.type === 'Identifier') {
        variables.push(value.name)
      }
    })
  }

  // 辅助函数：处理数组解构模式
  function arrayPatterner(pattern: any, variables: string[]) {
    pattern.elements.forEach((element: any) => {
      if (!element)
        return // 跳过空元素

      // 处理嵌套的对象解构
      if (element.type === 'ObjectPattern') {
        objectPatterner(element, variables)
      }
      // 处理嵌套的数组解构
      else if (element.type === 'ArrayPattern') {
        arrayPatterner(element, variables)
      }
      // 处理标识符
      else if (element.type === 'Identifier') {
        variables.push(element.name)
      }
      // 处理带默认值的解构
      else if (element.type === 'AssignmentPattern') {
        if (element.left.type === 'Identifier') {
          variables.push(element.left.name)
        }
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

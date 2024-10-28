import { parse } from '@babel/parser'

export function parseSetup(setupScript: HTMLScriptElement) {
  const setupText = setupScript.textContent || ''
  setupScript.remove()
  const retNames = getGlobalVars(setupText)
  return {
    setup: new Function(`for (const k in Vue) window[k] = Vue[k]; ${setupText} return { ${retNames} }`),
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
  function processObjectPattern(pattern: any, variables: string[]) {
    pattern.properties.forEach((prop: any) => {
      // 如果值是嵌套的对象解构
      if (prop.value.type === 'ObjectPattern') {
        processObjectPattern(prop.value, variables)
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

  return ast.program.body.reduce((variables: string[], node: any) => {
    // 处理变量声明
    if (node.type === 'VariableDeclaration') {
      node.declarations.forEach((declaration: any) => {
        // 处理对象解构赋值
        if (declaration.id.type === 'ObjectPattern') {
          processObjectPattern(declaration.id, variables)
        }
        // 处理数组解构赋值
        else if (declaration.id.type === 'ArrayPattern') {
          declaration.id.elements.forEach((element: any) => {
            if (element.type === 'Identifier') {
              variables.push(element.name)
            }
            // 处理嵌套数组解构
            else if (element.type === 'ArrayPattern') {
              element.elements.forEach((nestedElement: any) => {
                if (nestedElement && nestedElement.type === 'Identifier') {
                  variables.push(nestedElement.name)
                }
              })
            }
          })
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

import type { Statement } from '@babel/types'

/* 检查是否是否有顶层 await */
export function isAsyncModule(astBody: Statement[]) {
  return astBody
  // console.log(astBody)
  // return astBody.some(node => node.type === 'AwaitExpression')
}

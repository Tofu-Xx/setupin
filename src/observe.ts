import { loaded, when } from './tools'

// 首先定义一个辅助类型来处理回调函数的返回值
type ObserveResult<R extends (...args: any) => any> = Promise<ReturnType<R>>

// 添加新的类型定义来处理 map 情况
type ObserveMap = Record<string, (target: any) => any>
type InferObserveResult<T extends ObserveMap> = {
  [K in keyof T]: Promise<ReturnType<T[K]>>
}

export function observe<R extends (...args: any) => any>(selector: string, callback: R): ObserveResult<R>
export function observe<T extends ObserveMap>(map: T): InferObserveResult<T>
export function observe(SorM: string | Record<string, (target: any) => any>, callback?: (target: any) => any) {
  return when(SorM, typeof SorM)({
    string: selector => new Promise((resolve, reject) => {
      new MutationObserver((mutations, observer) => {
        for (const mutation of mutations) {
          const target = (mutation.target as HTMLElement)?.querySelector(selector)
          if (target && callback) {
            observer.disconnect()
            const result = callback(target)
            result instanceof Error
              ? reject(result)
              : resolve(result)
            break
          }
        }
        loaded(() => {
          observer.disconnect()
          reject(new Error(`No ${selector} found`))
        })
      }).observe(document, {
        childList: true,
        subtree: true,
      })
    }),
    object: map => Object.keys(map).reduce((prev, key) => ({
      ...prev,
      [key]: observe(key, map[key]),
    }), Object.create(null)),
  })
}

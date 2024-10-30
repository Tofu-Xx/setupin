import { loaded, when } from './tools'

type Fn = (...args: any) => any
type FnMap = Record<string, Fn>
type Ret<R extends Fn> = Promise<Exclude<ReturnType<R>, Error>>
type InferRet<T extends FnMap> = {
  [K in keyof T]: Ret<T[K]>
}

export function observe<R extends Fn>(selector: string, callback: R): Ret<R>
export function observe<T extends FnMap>(map: T): InferRet<T>
export function observe(SorM: string | Record<string, Fn>, callback?: Fn) {
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

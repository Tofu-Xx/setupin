import { when } from './tools'

type FnMap = Record<string, Fn>
type Ret<R extends Fn> = Promise<Exclude<ReturnType<R>, Error>>
type MapRet<T extends FnMap> = { [K in keyof T]: Ret<T[K]> }
export function observe<R extends Fn>(selector: string, callback: R): Ret<R>
export function observe<T extends FnMap>(map: T): MapRet<T>
export function observe(SorM: string | Record<string, Fn>, callback?: Fn) {
  return when(SorM, typeof SorM)({
    string: (selector: string) => new Promise((resolve, reject) => {
      let isFound = false
      new MutationObserver((mutations, observer) => {
        for (const mutation of mutations) {
          const target = (mutation.target as HTMLElement)?.querySelector(selector)
          if (target) {
            isFound = true
            observer.disconnect()
            const result = callback?.(target)
            result instanceof Error
              ? reject(result)
              : resolve(result)
            break
          }
        }
        document.addEventListener('DOMContentLoaded', () => {
          if (isFound)
            return
          observer.disconnect()
          const result = callback?.(void 0)
          if (result instanceof Error) {
            reject(result)
          }
          else {
            resolve(result)
            console.warn(`No ${selector} found`)
          }
        })
      }).observe(document, {
        childList: true,
        subtree: true,
      })
    }),
    object: (map: FnMap) => Object.fromEntries(
      Object.entries(map).map(([key, fn]) => [key, observe(key, fn)]),
    ),
  })
}

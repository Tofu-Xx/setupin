import { loaded, when } from './tools'

export function observe(selector: string, callback: (target: any) => any): any
export function observe(map: Record<string, (target: any) => any>): any
export function observe(SorM: string | Record<string, (target: any) => any>, callback?: (target: any) => any) {
  return when(typeof SorM)({
    string: () => new Promise((resolve, reject) => {
      new MutationObserver((mutations, observer) => {
        for (const mutation of mutations) {
          const target = (mutation.target as HTMLElement)?.querySelector(SorM as string)
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
          reject(new Error(`No ${SorM} found`))
        })
      }).observe(document, {
        childList: true,
        subtree: true,
      })
    }),
    object: () => Object.keys(SorM).reduce((prev, key) => ({
      ...prev,
      [key]: observe(key, SorM[key]),
    }), Object.create(null)),
  })
}

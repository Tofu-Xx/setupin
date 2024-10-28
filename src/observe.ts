export function observe(selector: string, callback: (target: any) => any): any
export function observe(map: Record<string, (target: any) => any>): any
export function observe(selectorOrMap: string | Record<string, (target: any) => any>, callback?: (target: any) => any) {
  return typify(selectorOrMap)({
    string: selector => new Promise((resolve, reject) => {
      const observer = new MutationObserver((mutations, observer) => {
        for (const mutation of mutations) {
          const target = (mutation.target as HTMLElement)?.querySelector(selector)
          if (target && callback) {
            const result = callback(target)
            observer.disconnect()
            resolve(result)
            break
          }
        }
      })
      observer.observe(document, {
        childList: true,
        subtree: true,
      })
      document.addEventListener('DOMContentLoaded', () => {
        observer.disconnect()
        reject(new Error(`No ${selector} found`))
      })
    }),
    object: map => Object.keys(map).reduce((result, key) => {
      result[key] = observe(key, map[key])
      return result
    }, Object.create(null)),
  })
}

function typify(unknow: any) {
  return (types: Record<string, (unknow: any) => any>) => types[typeof unknow](unknow)
}

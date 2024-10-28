export function observe(selector: string, callback: (target: any) => any): any
export function observe(map: Record<string, (target: any) => any>): any
export function observe(
  selectorOrMap: string | Record<string, (target: any) => any>,
  callback?: (target: any) => any,
) {
  if (typeof selectorOrMap === 'string') {
    const selector = selectorOrMap
    // 返回一个 Promise 来处理异步操作
    return new Promise((resolve, reject) => {
      const observer = new MutationObserver((mutations, observer) => {
        for (const mutation of mutations) {
          const target = (mutation.target as HTMLElement)?.querySelector(selector)
          if (target && callback) {
            const result = callback(target) ?? true
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
    })
  }
  else {
    const map = selectorOrMap
    const result = Object.create(null)
    for (const selector in map) {
      result[selector] = observe(selector, map[selector])
    }
    return result
  }
}

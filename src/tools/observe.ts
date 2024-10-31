type Ret<R extends Fn> = Promise<Exclude<ReturnType<R>, Error>>
export function observe<R extends Fn>(selector: string, callback: R): Ret<R> {
  return new Promise((resolve, reject) => {
    let isFound = false
    const observer = new MutationObserver((mutations, observer) => {
      for (const mutation of mutations) {
        const target = (mutation.target as HTMLElement)?.querySelector(selector)
        if (target) {
          isFound = true
          observer.disconnect()
          resolve(callback?.(target))
          break
        }
      }
    })
    observer.observe(document, {
      childList: true,
      subtree: true,
    })
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
  })
}

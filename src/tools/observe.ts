type Ret<R extends Fn> = Promise<ReturnType<R>>
export function observe<R extends Fn>(selector: string, callback: R): Ret<R> {
  return new Promise((resolve) => {
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
    observer.observe(document.head, {
      childList: true,
    })
    document.addEventListener('DOMContentLoaded', () => {
      if (isFound)
        return
      observer.disconnect()
      const result = callback(void 0)
      if (typeof result === 'function') {
        resolve(result())
      }
      else {
        resolve(result)
      }
    })
  })
}

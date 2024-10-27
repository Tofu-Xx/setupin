export function observe(selector: string, callback: (target: any) => void): void
export function observe(map: Record<string, (target: any) => void>): void
export function observe(
  selectorOrMap: string | Record<string, (target: any) => void>,
  callback?: (target: any) => void,
) {
  if (typeof selectorOrMap === 'string') {
    new MutationObserver((mutations, observer) => {
      for (const mutation of mutations) {
        const target = (mutation.target as HTMLElement)?.querySelector(selectorOrMap)
        if (target && callback) {
          callback(target)
          observer.disconnect()
          break
        }
      }
    }).observe(document, {
      childList: true,
      subtree: true,
    })
  }
  else {
    for (const selector in selectorOrMap) {
      observe(selector, selectorOrMap[selector])
    }
  }
}

export function observe(selector: string, backcall: (target: any) => void) {
  new MutationObserver((mutations, observer) => {
    for (const mutation of mutations) {
      const target = (mutation.target as HTMLElement).querySelector(selector)
      if (target) {
        backcall(target)
        observer.disconnect()
        break
      }
    }
  }).observe(document, {
    childList: true,
    subtree: true,
  })
}

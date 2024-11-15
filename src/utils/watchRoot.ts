export function watchRoot<T = any>(handler: Fn<[node: HTMLElement, carrier: T[]]>): Promise<T[]> {
  const carrier: T[] = []
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutations) => {
      for (const { addedNodes } of mutations)
        addedNodes.forEach(n => n instanceof HTMLElement && handler(n, carrier))
    })
    observer.observe(document.head, { childList: true })
    document.addEventListener('DOMContentLoaded', () => {
      resolve(carrier)
      observer.disconnect()
    })
  })
}

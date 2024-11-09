export function watchRoot<T = any>(handler: Fn<[node: Element, carrier: T[] ]>): Promise<T[]> {
  const carrier: T[] = []
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          node instanceof Element && handler(node, carrier)
        })
      }
    })
    observer.observe(document.head, {
      childList: true,
    })
    document.addEventListener('DOMContentLoaded', () => {
      resolve(carrier)
      observer.disconnect()
    })
  })
}

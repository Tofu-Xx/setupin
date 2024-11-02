export type OnPrior<T = any> = Fn<[{ node: Element, discovery: T, announce: Fn<[], void> }]>
export type OnAfter<T = any> = Fn<[{ discovery: T, announce: Fn<[], void> }]>
export function discover<T>(onPrior: OnPrior<T>, onAfter?: OnAfter<T>): Promise<T> {
  return new Promise((resolve) => {
    const discovery = Object.create(null)
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          node instanceof Element && onPrior({ node, discovery, announce })
        })
      }
    })
    observer.observe(document, {
      childList: true,
      subtree: true,
    })
    document.addEventListener('DOMContentLoaded', () => {
      onAfter?.({ discovery, announce })
      announce()
    })
    function announce() {
      resolve(discovery)
      observer.disconnect()
    }
  })
}

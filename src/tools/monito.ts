type Resolve<T> = (value: T | PromiseLike<T>) => void
export type OnPrior<T> = Fn<[{ node: Node, resolve: Resolve<T> }]>
export type OnAfter<T> = Fn<[{ resolve: Resolve<T> }]>
export function monito<T>(onPrior: OnPrior<T>, onAfter?: OnAfter<T>): Promise<T> {
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          onPrior({ node, resolve })
        })
      }
    })
    observer.observe(document, {
      childList: true,
      subtree: true,
    })
    document.addEventListener('DOMContentLoaded', () => {
      onAfter?.({ resolve })
      observer.disconnect()
    })
  })
}

import type { DoneByS } from '../doBy/script'
import type { DoneByT } from '../doBy/template'

interface Supply<T> {
  node: Node
  observer: MutationObserver
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}
export type OnPrior<T> = Fn<[Supply<T>]>
export type OnAfter<T> = Fn<[Omit<Supply<T>, 'node'>]>
export function monito<T>(onPrior: OnPrior<T>, onAfter?: OnAfter<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const observer = new MutationObserver((mutations, observer) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          onPrior({ node, observer, resolve, reject })
        })
      }
    })
    observer.observe(document, {
      childList: true,
      subtree: true,
    })
    document.addEventListener('DOMContentLoaded', () => {
      onAfter?.({ observer, resolve, reject })
    })
  })
}

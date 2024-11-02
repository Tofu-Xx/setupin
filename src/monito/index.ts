import type { ParsedScript } from './parseScript'
import type { ParsedTemplate } from './parseTemplate'

interface Supply {
  node: Node
  observer: MutationObserver
  resolve: (value: Data | PromiseLike<Data>) => void
  reject: (reason?: any) => void
}
export type Data = [ParsedScript, ParsedTemplate]
export function monito(monitor: Fn<[Supply]>, loaded?: Fn<[Omit<Supply, 'node'>]>): Promise<Data> {
  return new Promise((resolve, reject) => {
    const observer = new MutationObserver((mutations, observer) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          monitor({ node, observer, resolve, reject })
        })
      }
    })
    observer.observe(document, {
      childList: true,
      subtree: true,
    })
    document.addEventListener('DOMContentLoaded', () => {
      loaded?.({ observer, resolve, reject })
    })
  })
}

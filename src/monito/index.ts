import { parseScript } from './parseScript'
import { parseTemplate } from './parseTemplate'

type Data = [ReturnType<typeof parseScript>, ReturnType<typeof parseTemplate>]
export function monito(): Promise<Data> {
  const data: Data = [void 0, void 0] as unknown as Data
  return new Promise((resolve) => {
    function _finder(fn: Fn, target: Element | string) {
      const [i, type] = fn === parseScript ? [0, 'warn'] : [1, 'error']
      if (data[i] !== void 0)
        return
      if (typeof target === 'string') {
        data[i] = fn(void 0)
        ;(console as any)[type](`not found ${target} in root node`)
      }
      else {
        data[i] = fn(target)
      }
      if (data.every(e => e !== void 0))
        resolve(data)
    }
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element))
            return
          if (node.tagName === 'TEMPLATE' && node.parentNode === document.head) {
            _finder(parseTemplate, node)
          }
          if (node.tagName === 'SCRIPT' && node.hasAttribute('setup')) {
            if (node.parentNode === document.head) {
              _finder(parseScript, node)
            }
            else {
              node.textContent = '/* Resolved to the wrong location */'
            }
          }
        })
      }
    })
    observer.observe(document, {
      childList: true,
      subtree: true,
    })
    document.addEventListener('DOMContentLoaded', () => {
      _finder(parseScript, '<script setup>')
      _finder(parseTemplate, '<template>')
      observer.disconnect()
    })
  })
}

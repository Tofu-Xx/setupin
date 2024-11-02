import type { Result } from '../result'
import type { ParsedScript } from './parseScript'
import type { ParsedTemplate } from './parseTemplate'

import { parseScript } from './parseScript'
import { parseTemplate } from './parseTemplate'

type Data = [ParsedScript, ParsedTemplate]
export function monito(): Promise<Data> {
  const data: Data = [null, null] as unknown as Data
  return new Promise((resolve) => {
    function _finder(fn: Fn<any, Result>, target: Element | string) {
      const [i, type] = fn === parseScript ? [0, 'warn'] : [1, 'error']
      const arg = typeof target === 'string' ? null : target
      const { ok, isErr } = fn(arg)
      if (isErr)
        return
      data[i] = ok
      if (!arg) {
        ;(console as any)[type](`not found ${target} in root node`)
      }
      if (data.every(e => e !== null))
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

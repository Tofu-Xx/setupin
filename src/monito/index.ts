import type { ParsedScript } from './parseScript'
import type { ParsedTemplate } from './parseTemplate'
import { Err, Ok, type Result } from '../result'

import { when } from '../tools'
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
          isElSite(node, 'template').ok && _finder(parseTemplate, node as Element)
          when(node, isElSite(node, 'script', 'setup').ok)({
            true: (n: Element) => _finder(parseScript, n),
            false: (n: Element) => (n).textContent = '/* Resolved to the wrong location */',
          })
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
// interface NodeInfo {
//   tagName: string
//   attrNames: string[]
//   parentTagName: string
// }
// function getNodeInfo(node: Node): Option<NodeInfo> {
//   }

function isElSite(node: Node, tagName: string, attrName?: string) {
  if (!(node instanceof Element))
    return new Err(`${node} is not element`)
  const isTagName = tagName === node.localName
  const isAttrName = attrName ? node.getAttributeNames().includes(attrName) : true
  if (isTagName && isAttrName)
    return new Ok(node.parentElement === document.head)
  return new Err(`${tagName} ${attrName ? `with ${attrName}` : ''} not found`)
}

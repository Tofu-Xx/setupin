import type { Data } from './monito'
import type { Result } from './result'
import { generate } from './generate'
import { monito } from './monito'
import { parseScript } from './monito/parseScript'
import { parseTemplate } from './monito/parseTemplate'
import { Err, Ok } from './result'
import { when } from './tools'

const finder = (() => {
  const data: Data = [null, null] as unknown as Data
  return function (fn: Fn<any, Result>, target: Element | string, resolve: Fn) {
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
})()
function isSite(node: Node, tagName: string, attrName?: string) {
  if (!(node instanceof Element))
    return new Err(`${node} is not element`)
  const isTagName = tagName === node.localName
  const isAttrName = attrName ? node.getAttributeNames().includes(attrName) : true
  if (isTagName && isAttrName)
    return new Ok(node.parentElement === document.head)
  return new Err(`${tagName} ${attrName ? `with ${attrName}` : ''} not found`)
}

const monitored = monito(({ node, resolve }) => {
  isSite(node, 'template').ok && finder(parseTemplate, node as Element, resolve)
  when(node, isSite(node, 'script', 'setup').ok)({
    true: (n: Element) => finder(parseScript, n, resolve),
    false: (n: Element) => (n).textContent = '/* Resolved to the wrong location */',
  })
}, ({ observer, resolve }) => {
  finder(parseScript, '<script setup>', resolve)
  finder(parseTemplate, '<template>', resolve)
  observer.disconnect()
})

;(async () => {
  const [{ scriptEl, context }, templateContent] = await monitored
  scriptEl.textContent = generate(templateContent, context)
})()

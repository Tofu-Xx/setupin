import type { Carrier } from '../doms/carrier'
import type { DoneByS } from '../doms/script'
import type { DoneByT } from '../doms/template'
import type { OnPrior } from '../tools/monito'
import { SCRIPT_TAG, TEMPLATE_TAG } from '../doms'
import { Err, Ok } from '../result'
import { when } from '../tools'
import { resolver } from './resolver'

export const onPrior: OnPrior<Carrier> = ({ node, resolve }) => {
  const verdict = _verdictFactory(node)
  verdict(TEMPLATE_TAG).ok && resolver(TEMPLATE_TAG, resolve, node as Element)
  when(verdict(SCRIPT_TAG).ok)({
    true: () => resolver(SCRIPT_TAG, resolve, node as Element),
    false: () => (node.textContent = '/* Resolved to the wrong location */'),
  })
}

function _verdictFactory(node: Node) {
  if (!(node instanceof Element))
    return () => new Err(`${node} is not element`)
  return function _verdict(aimTag: ROOT_TAG) {
    const parse = new DOMParser()
    const aim = parse.parseFromString(`<body>${aimTag}</body>`, 'text/html').body.firstElementChild!
    const isTag = aim.tagName === node.tagName
    const nodeAttrs = node.getAttributeNames()
    const aimAttrs = aim.getAttributeNames()
    const hasAttr = aimAttrs.every(attr => nodeAttrs.includes(attr))
    if (isTag && hasAttr)
      return new Ok(node.parentElement === document.head)
    return new Err(`${node} is not ${aimTag}`)
  }
}

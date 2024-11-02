import { Err, Ok } from '../result'

export function verdict(aimTag: ROOT_TAG, node: Node) {
  if (!(node instanceof Element))
    return new Err(`${node} is not element`)
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

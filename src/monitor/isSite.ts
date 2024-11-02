import { Err, Ok } from '../result'

export function isSite(node: Node, tagName: string, attrName?: string) {
  if (!(node instanceof Element))
    return new Err(`${node} is not element`)
  const isTagName = tagName === node.localName
  const isAttrName = attrName ? node.getAttributeNames().includes(attrName) : true
  if (isTagName && isAttrName)
    return new Ok(node.parentElement === document.head)
  return new Err(`${tagName} ${attrName ? `with ${attrName}` : ''} not found`)
}

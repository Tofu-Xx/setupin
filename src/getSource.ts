export function getSource(node: Element, data: string[]) {
  if (/^(?:script|style|template)$/.test(node.localName)) {
    data.push(node.outerHTML)
    node.remove()
  }
}

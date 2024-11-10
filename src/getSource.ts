export function getSource(node: HTMLElement, data: string[]) {
  if (/^(?:script|template|style)$/.test(node.localName)) {
    data.push(node.outerHTML)
    node.localName !== 'style'
      ? node.remove()
      : (node.onload = node.remove)
  }
}

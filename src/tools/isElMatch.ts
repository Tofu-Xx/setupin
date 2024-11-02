export function isElMatch(el: Element, targetHtml: string): boolean {
  try {
    const parse = new DOMParser()
    const aimEl = parse.parseFromString(`<body>${targetHtml}</body>`, 'text/html').body.firstElementChild
    const isTag = aimEl?.tagName === el.tagName
    const nodeAttrs = el.getAttributeNames()
    const aimAttrs = aimEl?.getAttributeNames() ?? []
    const hasAttr = aimAttrs?.every(attr => nodeAttrs.includes(attr))
    return isTag && hasAttr
  }
  catch {
    return false
  }
}

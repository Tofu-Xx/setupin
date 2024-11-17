import { watchRoot } from '@/utils'

export async function awaitClientCode(handler: Fn<[string]>) {
  const sfcCode = await watchRoot<string>((node, carrier) => {
    if (!/^(?:script|template|style)$/.test(node.localName)) return
    if (node.hasAttribute('src')) return
    carrier.push(node.outerHTML)
    node.localName === 'style'
      ? (node.onload = node.remove)
      : node.remove()
  })
  handler(sfcCode.join('\n'))
}

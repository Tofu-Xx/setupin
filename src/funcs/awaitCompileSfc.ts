import type { CompiledSFC } from '@/compilerSfc/types'
import { compilerSfc } from '@/compilerSfc'
import { watchRoot } from '@/utils'

export async function awaitCompileSfc(handler: Fn<[CompiledSFC]>) {
  const clientCodeList = await watchRoot<string>((node, clientCodeList) => {
    if (!/^(?:script|template|style)$/.test(node.localName))
      return
    if (node.hasAttribute('src'))
      return
    clientCodeList.push(node.outerHTML)
    node.localName === 'style'
      ? (node.onload = node.remove)
      : node.remove()
  })
  const hasScript = clientCodeList.some(code => code.slice(1, 7) === 'script')
  hasScript || clientCodeList.push('<script>/* empty script */</script>')
  handler(compilerSfc(clientCodeList.join('\n')))
}

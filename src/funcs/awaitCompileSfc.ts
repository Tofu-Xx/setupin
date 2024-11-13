import type { SFCScriptBlock, SFCStyleCompileResults, SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { compilerSfc } from '@/compilerSfc'
import { watchRoot } from '@/utils'

export async function awaitCompileSfc(handler: Fn<[SFCStyleCompileResults[], SFCScriptBlock, SFCTemplateCompileResults]>) {
  const clientCodeList = await watchRoot((node, clientCodeList) => {
    if (!/^(?:script|template|style)$/.test(node.localName))
      return
    if (node.hasAttribute('src'))
      return
    clientCodeList.push(node.outerHTML)
    node.localName === 'style'
      ? (node.onload = node.remove)
      : node.remove()
  })
  const { sfcScriptBlock, sfcTemplateCompileResults, sfcStyleCompileResultsList } = compilerSfc(clientCodeList.join('\n'))
  handler(sfcStyleCompileResultsList, sfcScriptBlock, sfcTemplateCompileResults)
}

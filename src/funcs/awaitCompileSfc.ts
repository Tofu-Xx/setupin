import type { SFCScriptBlock, SFCStyleCompileResults, SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { compilerSfc } from '@/compilerSfc'
import { INIT_CODE } from '@/data'
import { watchRoot } from '@/utils'

export async function awaitCompileSfc(handler: Fn<[SFCStyleCompileResults[], SFCScriptBlock, SFCTemplateCompileResults]>) {
  const clientCodeList = await watchRoot((node, data) => {
    if (/^(?:script|template|style)$/.test(node.localName)) {
      data.push(node.outerHTML)
      node.localName === 'style'
        ? (node.onload = node.remove)
        : node.remove()
    }
  })
  const { sfcScriptBlock, sfcTemplateCompileResults, sfcStyleCompileResultsList } = compilerSfc(INIT_CODE + clientCodeList.join('\n'))
  handler(sfcStyleCompileResultsList, sfcScriptBlock, sfcTemplateCompileResults)
}

import type { SFCScriptBlock, SFCStyleCompileResults, SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { compilerSfc } from '@/compilerSfc'
import { watchRoot } from '@/utils'

export async function awaitCompileSfc(handler: Fn<[SFCStyleCompileResults[], SFCScriptBlock, SFCTemplateCompileResults]>) {
  const sources = await watchRoot((node, data) => {
    if (/^(?:script|template|style)$/.test(node.localName)) {
      data.push(node.outerHTML)
      node.localName === 'style'
        ? (node.onload = node.remove)
        : node.remove()
    }
    else {
      console.log('unknown node', node)
    }
  })
  const { sfcScriptBlock, sfcTemplateCompileResults, sfcStyleCompileResultsList } = compilerSfc(sources.join('\n'))
  handler(sfcStyleCompileResultsList, sfcScriptBlock, sfcTemplateCompileResults)
}

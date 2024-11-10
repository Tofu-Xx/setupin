import type { SFCScriptBlock, SFCStyleCompileResults, SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { MagicString } from '@vue/compiler-sfc'

export function scriptTransform(sfcScriptBlock: SFCScriptBlock) {
  const s = new MagicString(sfcScriptBlock.content)
  s.replace('export default', 'const __appcomp__ =')
  s.prependLeft(sfcScriptBlock.content.indexOf('Object.defineProperty(__returned__'), '// ')
  return s.toString()
}

export function templateTransform(sfcTemplateCompileResults: SFCTemplateCompileResults) {
  const t = new MagicString(sfcTemplateCompileResults.code)
  t.replace('export function render', '__appcomp__.render = function')
  return t.toString()
}

export function styleTransform(sfcStyleCompileResultsList: SFCStyleCompileResults[]) {
  return sfcStyleCompileResultsList.map(style => style.code).join('\n')
}

import type { SFCScriptBlock, SFCStyleCompileResults, SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { MagicString } from '@vue/compiler-sfc'
import { AppVarName } from './data'

export function scriptTransform(sfcScriptBlock: SFCScriptBlock) {
  const s = new MagicString(sfcScriptBlock.content)
  s.replace('export default', `const ${AppVarName} =`)
  s.prependLeft(sfcScriptBlock.content.indexOf('Object.defineProperty(__returned__'), '// ')
  return s.toString()
}

export function templateTransform(sfcTemplateCompileResults: SFCTemplateCompileResults) {
  const t = new MagicString(sfcTemplateCompileResults.code)
  t.replace('export function render', `${AppVarName}.render = function`)
  return t.toString()
}

export function styleTransform(sfcStyleCompileResultsList: SFCStyleCompileResults[]) {
  return sfcStyleCompileResultsList.map(style => style.code).join('\n')
}

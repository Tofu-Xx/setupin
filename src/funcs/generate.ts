import type { SFCScriptBlock, SFCStyleCompileResults, SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { APP_VAR_NAME, CREATE_APP_CODE } from '@/data'
import { MagicString } from '@vue/compiler-sfc'

export function generateStyleCode(sfcStyleCompileResultsList: SFCStyleCompileResults[]) {
  return sfcStyleCompileResultsList.map(style => style.code).join('\n')
}

export function generateEsmCode(sfcScriptBlock: SFCScriptBlock, sfcTemplateCompileResults: SFCTemplateCompileResults) {
  return `
    ${_scriptTransform(sfcScriptBlock)}
    ${_templateTransform(sfcTemplateCompileResults)}
    ${CREATE_APP_CODE}
  `
  function _scriptTransform(sfcScriptBlock: SFCScriptBlock) {
    const s = new MagicString(sfcScriptBlock.content)
    s.replace('export default', `${APP_VAR_NAME} =`)
    s.replace('Object.defineProperty(__returned__,', '// ')
    return s.toString()
  }

  function _templateTransform(sfcTemplateCompileResults: SFCTemplateCompileResults) {
    const t = new MagicString(sfcTemplateCompileResults.code)
    t.replace('export function render', `${APP_VAR_NAME}.render = function`)
    return t.toString()
  }
}

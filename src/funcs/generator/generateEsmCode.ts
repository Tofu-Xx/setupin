import { APP_VAR_NAME, CREATE_APP_CODE, INIT_CODE, REPO_NAME } from '@/data'
import { MagicString, type SFCScriptBlock, type SFCTemplateCompileResults } from '@vue/compiler-sfc'

export function generateEsmCode(sfcScriptBlock: SFCScriptBlock, sfcTemplateCompileResults: SFCTemplateCompileResults) {
  return `
    ${INIT_CODE}
    ${_scriptTransform(sfcScriptBlock)}
    ${_templateTransform(sfcTemplateCompileResults)}
    ${CREATE_APP_CODE}
  `
  function _scriptTransform(sfcScriptBlock: SFCScriptBlock) {
    const s = new MagicString(sfcScriptBlock.content)
    s.replace('export default', `${APP_VAR_NAME} =`)
    s.prependLeft(sfcScriptBlock.content.indexOf('__name'), `__scopeId: "data-v-${REPO_NAME}",`)
    s.replace(/Object\.defineProperty\(__returned__.*/, '')
    return s.toString()
  }

  function _templateTransform(sfcTemplateCompileResults: SFCTemplateCompileResults) {
    const t = new MagicString(sfcTemplateCompileResults.code)
    t.replace('export function render', `${APP_VAR_NAME}.render = function`)
    return t.toString()
  }
}

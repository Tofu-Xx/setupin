import type { SFCAppBlock } from '@/compilerSfc'
import { APP_VAR_NAME, CREATE_APP_CODE, INIT_CODE, REPO_NAME } from '@/data'
import { MagicString, type SFCTemplateCompileResults } from '@vue/compiler-sfc'

export function generateEsmCode(sfcAppBlock: SFCAppBlock, sfcTemplateCompileResults: SFCTemplateCompileResults) {
  return `
    ${INIT_CODE}
    ${_scriptTransform(sfcAppBlock)}
    ${_templateTransform(sfcTemplateCompileResults)}
    ${CREATE_APP_CODE}
  `
  function _scriptTransform(sfcAppBlock: SFCAppBlock) {
    const s = new MagicString(sfcAppBlock.content)
    s.replace('export default', `${APP_VAR_NAME} =`)
    sfcAppBlock.isScoped && s.prependLeft(sfcAppBlock.content.indexOf('__name'), `__scopeId: "data-v-${REPO_NAME}",`)
    s.replace(/Object\.defineProperty\(__returned__.*/, '')
    return s.toString()
  }

  function _templateTransform(sfcTemplateCompileResults: SFCTemplateCompileResults) {
    const s = new MagicString(sfcTemplateCompileResults.code)
    s.replace('export function render', `${APP_VAR_NAME}.render = function`)
    return s.toString()
  }
}

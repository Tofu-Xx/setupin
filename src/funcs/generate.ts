import type { SFCScriptBlock, SFCStyleCompileResults, SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { APP_VAR_NAME, CREATE_APP_CODE, CREATE_ASYNC_APP_CODE } from '@/data'
import { babelParse, MagicString, rewriteDefault, walk, walkIdentifiers } from '@vue/compiler-sfc'

export function generateStyleCode(sfcStyleCompileResultsList: SFCStyleCompileResults[]) {
  return sfcStyleCompileResultsList.map(style => style.code).join('\n')
}

export function generateEsmCode(sfcScriptBlock: SFCScriptBlock, sfcTemplateCompileResults: SFCTemplateCompileResults) {
  return `
    ${_scriptTransform(sfcScriptBlock)}
    ${_templateTransform(sfcTemplateCompileResults)}
    if(String(${APP_VAR_NAME}.setup).startsWith('async')){${CREATE_ASYNC_APP_CODE}}
    else{${CREATE_APP_CODE}}
  `
}

function _scriptTransform(sfcScriptBlock: SFCScriptBlock) {
  // rewriteDefault(sfcScriptBlock.content, AppVarName, ['topLevelAwait', 'typescript'])
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

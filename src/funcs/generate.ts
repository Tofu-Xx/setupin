import type { SFCScriptBlock, SFCStyleCompileResults, SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { AppVarName } from '@/data'
import { MagicString, rewriteDefault } from '@vue/compiler-sfc'

export function generateStyleCode(sfcStyleCompileResultsList: SFCStyleCompileResults[]) {
  return sfcStyleCompileResultsList.map(style => style.code).join('\n')
}

export function generateEsmCode(sfcScriptBlock: SFCScriptBlock, sfcTemplateCompileResults: SFCTemplateCompileResults) {
  return `
    ${_scriptTransform(sfcScriptBlock)}
    ${_templateTransform(sfcTemplateCompileResults)}
    import { createApp } from "vue";
    createApp(${AppVarName}).mount(document.body)
  `
}

function _scriptTransform(sfcScriptBlock: SFCScriptBlock) {
  // rewriteDefault(sfcScriptBlock.content, AppVarName, ['topLevelAwait', 'typescript'])
  const s = new MagicString(sfcScriptBlock.content)
  s.replace('export default', `const ${AppVarName} =`)
  s.replace('Object.defineProperty(__returned__', '// ')
  return s.toString()
}

function _templateTransform(sfcTemplateCompileResults: SFCTemplateCompileResults) {
  const t = new MagicString(sfcTemplateCompileResults.code)
  t.replace('export function render', `${AppVarName}.render = function`)
  return t.toString()
}

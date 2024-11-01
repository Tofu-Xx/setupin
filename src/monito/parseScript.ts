import { ast } from '../ast'
import { once } from '../tools'

export const parseScript = once(_parseScript)
function _parseScript(scriptEl: Tag['script'] | undefined) {
  const scriptContent = scriptEl?.textContent ?? ''
  if (scriptEl) {
    scriptEl.textContent = ''
  }
  else {
    scriptEl = document.createElement('script')
    document.head.appendChild(scriptEl)
  }
  scriptEl.type = 'module'
  const { extractImport, getGlobalVars, isAsyncModule } = ast(scriptContent)
  return {
    scriptEl,
    context: {
      retNames: getGlobalVars(),
      isAsync: isAsyncModule(),
      ...extractImport(),
    } as Context,
  }
}

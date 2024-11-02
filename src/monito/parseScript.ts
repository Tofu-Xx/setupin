import { ast } from '../ast'
import { once } from '../tools'

function _parseScript(scriptEl: Option<Tag['script']>) {
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

export const parseScript = once(_parseScript)
export type ParsedScript = ReturnType<typeof _parseScript>

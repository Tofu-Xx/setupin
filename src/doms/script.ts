import { ast } from '../ast'
import { once } from '../tools'

export function doByS(scriptEl: Maybe<Tag['script']>) {
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

// export const doByS = once(_doByS)
export type DoneByS = ReturnType<typeof doByS>

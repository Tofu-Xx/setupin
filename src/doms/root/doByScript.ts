import { ast } from '@/ast'

export type DoneByScript = ReturnType<typeof doByScript>
export function doByScript(scriptEl?: Maybe<Tag['script']>) {
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

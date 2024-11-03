import { ast } from '@/funcs/ast'

export type ParsedScript = ReturnType<typeof parseScript>
export function parseScript(scriptEl?: Maybe<Tag['script']>) {
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

import { ast } from '@/funcs/ast'
import { when } from '@/util/index'

export type ParsedScript = ReturnType<typeof parseScript>
export function parseScript(scriptEl?: Maybe<Tag['script']>) {
  const scriptContent = scriptEl?.innerHTML ?? ''
  when(scriptEl?.tagName ?? 0)({
    0: () => {
      scriptEl = document.createElement('script')
      document.head.appendChild(scriptEl)
    },
    SCRIPT: () => scriptEl!.innerHTML = '',
  })
  scriptEl!.type = 'module'
  const { extractImport, getGlobalVars, isAsyncModule } = ast(scriptContent)
  return {
    scriptEl,
    retNames: getGlobalVars(),
    isAsync: isAsyncModule(),
    ...extractImport(),
  }
}

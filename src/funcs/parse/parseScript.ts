import { ast } from '../ast'
import { when } from '../../tools'

export type ParsedScript = ReturnType<typeof parseScript>
export function parseScript(scriptEl?: Maybe<Tag['script']>) {
  const scriptContent = scriptEl?.textContent ?? ''
  when(scriptEl?.tagName ?? 0)({
    0: () => {
      scriptEl = document.createElement('script')
      document.head.appendChild(scriptEl)
    },
    SCRIPT: () => scriptEl!.textContent = '',
  })
  scriptEl!.type = 'module'
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

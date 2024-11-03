import { when } from '../../tools'
import { ast } from '../ast'

export interface Context {
  importsCode: string
  setupCode: string
  retNames: string[]
  isAsync: boolean
}
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

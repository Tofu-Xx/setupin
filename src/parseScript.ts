import { ast } from './ast'

export function parseScript(setupEl: Tag['script'] | undefined) {
  const scriptContent = setupEl?.textContent ?? ''
  if (setupEl) {
    setupEl.textContent = ''
  }
  else {
    setupEl = document.createElement('script')
    document.head.appendChild(setupEl)
  }
  setupEl.type = 'module'
  const { extractImport, getGlobalVars, isAsyncModule } = ast(scriptContent)
  return {
    setupEl,
    context: {
      retNames: getGlobalVars(),
      isAsync: isAsyncModule(),
      ...extractImport(),
    } as Context,
  }
}

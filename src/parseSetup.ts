import { ast } from './ast'

export function parseSetup(setupEl: Tag['script'] | undefined) {
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
  console.log(isAsyncModule())
  return {
    ...extractImport(),
    retNames: getGlobalVars(),
    setupEl,
  }
}

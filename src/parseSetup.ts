import { ast } from './ast'

export function parseSetup(setupEl: Tag['script'] | undefined) {
  const scriptContent = setupEl?.textContent ?? ''
  if (setupEl) {
    setupEl.type = 'module'
    setupEl.textContent = ''
  }
  else {
    setupEl = document.createElement('script')
    setupEl.type = 'module'
    document.head.appendChild(setupEl)
  }
  const { extractImport, getGlobalVars } = ast(scriptContent)
  return {
    ...extractImport(),
    retNames: getGlobalVars(),
    setupEl,
  }
}

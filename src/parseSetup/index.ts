import { extractImport, getASTBody, getGlobalVars } from './parseAST'

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
  const astBody = getASTBody(scriptContent)
  const [importText, setupText] = extractImport(scriptContent, astBody)
  const retNames = getGlobalVars(astBody)
  return {
    setupEl,
    importText,
    setupText,
    retNames,
  }
}

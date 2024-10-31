import { extractImport, getASTBody, getGlobalVars } from './parseAST'

export function parseSetup(scriptEl: Tag['script'] | undefined) {
  const scriptText = scriptEl?.textContent ?? ''
  const astBody = getASTBody(scriptText)
  const [importText, setupText] = extractImport(scriptText, astBody)
  if (scriptEl && importText) {
    scriptEl.type = 'module'
    scriptEl.textContent = importText
    // 等待scriptEl加载
  }
  else {
    scriptEl?.remove()
  }
  return {
    setupText,
    retNames: getGlobalVars(astBody),
  }
}

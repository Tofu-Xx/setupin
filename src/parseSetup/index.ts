import { extractImport, getASTBody, getGlobalVars } from './parseAST'

export async function parseSetup(setupScript: Tag['script'] | undefined) {
  const scriptText = setupScript?.textContent ?? ''
  const astBody = getASTBody(scriptText)
  const [importText, setupText] = extractImport(scriptText, astBody)
  console.log('importText:', importText)
  console.log('setupText:', setupText)
  setupScript?.remove()
  return {
    setupText: scriptText,
    retNames: getGlobalVars(astBody),
  }
}

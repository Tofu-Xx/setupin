import { getASTBody, getGlobalVars, splitImport } from './parseAST'

export async function parseSetup(setupScript: HTMLScriptElement) {
  const setupText = setupScript.textContent ?? ''
  const astBody = getASTBody(setupText)
  /* const rawImports = */ splitImport(setupText, astBody)
  // console.log(rawImports)
  setupScript.remove()
  return {
    setupText,
    retNames: getGlobalVars(astBody),
  }
}

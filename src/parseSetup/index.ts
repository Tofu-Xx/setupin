import { Vue } from '../assets/vue'
import { getASTBody, getGlobalVars, splitImport } from './parseAST'

export function parseSetup(setupScript: HTMLScriptElement) {
  const setupText = setupScript.textContent ?? ''
  const astBody = getASTBody(setupText)
  /* const rawImports = */ splitImport(setupText, astBody)
  // console.log(rawImports)
  setupScript.remove()
  return {
    setup: new Function(`const { ${Object.keys(Vue)} } = Vue; ${setupText} return { ${getGlobalVars(astBody)} }`),
  }
}

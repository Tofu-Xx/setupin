import { Vue } from '../assets/vue'
import { doImport, getASTBody, getGlobalVars } from './parseAST'

export function parseSetup(setupScript: HTMLScriptElement) {
  const setupText = setupScript.textContent ?? ''
  const astBody = getASTBody(setupText)
  doImport(astBody)
  setupScript.remove()
  return {
    setup: new Function(`const { ${Object.keys(Vue)} } = Vue; ${setupText} return { ${getGlobalVars(astBody)} }`),
  }
}

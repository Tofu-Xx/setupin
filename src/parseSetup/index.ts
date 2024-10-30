import { Vue } from '../assets/vue'
import { getASTBody, getGlobalVars } from './parseAST'

export function parseSetup(setupScript: HTMLScriptElement) {
  const setupText = setupScript.textContent ?? ''
  const astBody = getASTBody(setupText)
  setupScript.remove()
  return {
    setup: new Function(`const { ${Object.keys(Vue)} } = Vue; ${setupText} return { ${getGlobalVars(astBody)} }`),
  }
}

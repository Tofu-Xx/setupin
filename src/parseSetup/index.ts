import { Vue } from '../assets/vue'
import { getGlobalVars } from './parseAST'

export function parseSetup(setupScript: HTMLScriptElement) {
  const setupText = setupScript.textContent ?? ''
  setupScript.remove()
  return {
    setup: new Function(`const { ${Object.keys(Vue)} } = Vue; ${setupText} return { ${getGlobalVars(setupText)} }`),
  }
}

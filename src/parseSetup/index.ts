import { extractImport, getASTBody, getGlobalVars } from './parseAST'

export function parseSetup(scriptEl: Tag['script'] | undefined) {
  if (!scriptEl)
    return
  const scriptText = scriptEl.textContent ?? ''
  const astBody = getASTBody(scriptText)
  const [importText, setupText] = extractImport(scriptText, astBody)
  const retNames = getGlobalVars(astBody)
  scriptEl.type = 'module'

  scriptEl.textContent = `
  import * as Vue from 'https://unpkg.com/vue/dist/vue.esm-browser.prod.js'
  ${importText}
  for (const k in Vue) {
    window[k] = Vue[k]
  }
  Vue.createApp({
    setup(){
      ${setupText}
      return {
        ${retNames}
      }
    }
  }).mount(document.body)
  `
}

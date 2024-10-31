import { observe } from './observe'
import { parseSetup } from './parseSetup'
import { parseTemplate } from './parseTemplate'

const oSetup = observe('script[setup]', parseSetup)
const oTemplate = observe('head>template', parseTemplate)

// ;(async () => {
 
// })()
const template = await oTemplate
const { setupEl, importText, setupText, retNames } = await oSetup
setupEl.textContent = `
import * as Vue from 'https://unpkg.com/vue/dist/vue.esm-browser.prod.js'
${importText}
for (const k in Vue) {
  window[k] = Vue[k]
}
Vue.createApp({
  template: \`${template}\`,
  setup(){
    ${setupText}
    return {
      ${retNames}
    }
  }
}).mount(document.body)
`
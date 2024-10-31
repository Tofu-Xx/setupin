import { parseSetup } from './parseSetup'
import { parseTemplate } from './parseTemplate'
import { observe } from './tools'

const oTemplate = observe('head>template', parseTemplate)
const oSetup = observe('script[setup]', parseSetup)

;(async () => {
  const template = await oTemplate
  const { setupEl, importText, setupText, retNames, isAsync } = await oSetup
  window.Vue = await import('https://unpkg.com/vue/dist/vue.esm-browser.prod.js')
  setupEl.textContent = `
  ${importText}
  const { ${Object.keys(window.Vue)} } = Vue
  createApp({
    template: \`${template}\`,
    ${isAsync ? 'async' : ''} setup(){
      ${setupText}
      return {
        ${retNames}
      }
    }
  }).mount(document.body)
  `
})()

import { Vue } from './assets/vue'
import { domMonito } from './domMonito'
import { generateCode } from './generateCode'
import { parseSetup } from './parseSetup'
import { parseTemplate } from './parseTemplate'
import { observe } from './tools'

window.Vue = Vue as Vue
domMonito()
const oSetup = observe('script[setup]', parseSetup)
const oTemplate = observe('head>template', parseTemplate)

;(async () => {
  const [{ setupEl, context }, template] = await Promise.all([oSetup, oTemplate])
  setupEl.textContent = generateCode(template, context)
})()

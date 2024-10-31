import { Vue } from './assets/vue'
import { domMonito } from './domMonito'
import { generateCode } from './generateCode'
import { parseScript } from './parseScript'
import { parseTemplate } from './parseTemplate'
import { observe } from './tools'

window.Vue = Vue as Vue
const monitored = domMonito()
// const oSetup = observe('script[setup]', parseScript)
// const oTemplate = observe('head>template', parseTemplate)

;(async () => {
  // const [{ setupEl, context }, template] = await Promise.all([oSetup, oTemplate])
  const [{ setupEl, context }, template] = await monitored
  setupEl.textContent = generateCode(template, context)
})()

import { Vue } from './assets/vue'
import { generateCode } from './generateCode'
import { parseSetup } from './parseSetup'
import { parseTemplate } from './parseTemplate'
import { observe } from './tools'

window.Vue = Vue as Vue
const oTemplate = observe('head>template', parseTemplate)
const oSetup = observe('script[setup]', parseSetup)

;(async () => {
  try {
    const [{ setupEl, context }, template] = await Promise.all([oSetup, oTemplate])
    setupEl.textContent = generateCode(template, context)
  }
  catch {}
})()

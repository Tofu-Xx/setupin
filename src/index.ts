import { Vue } from './assets/vue'
import { generate } from './generate'
import { monito } from './monito'

window.Vue = Vue as Vue
const monitored = monito()

;(async () => {
  const [{ scriptEl, context }, templateContent] = await monitored
  scriptEl.textContent = generate(templateContent, context)
})()

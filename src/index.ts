import { generate } from './generate'
import { monito } from './monito'

const monitored = monito()

;(async () => {
  const [{ scriptEl, context }, templateContent] = await monitored
  scriptEl.textContent = generate(templateContent, context)
})()

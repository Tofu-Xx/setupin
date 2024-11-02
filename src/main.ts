import { generate } from './generate'
import { onAfter, onPrior } from './monitor'
import { monito } from './tools'

const monitored = monito(onPrior, onAfter)

;(async () => {
  const [{ scriptEl, context }, templateContent] = await monitored
  scriptEl.textContent = generate(templateContent, context)
})()

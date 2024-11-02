import { generate } from './generate'
import { onAfter } from './monitor/onAfter'
import { onPrior } from './monitor/onPrior'
import { monito } from './tools'

const monitored = monito(onPrior, onAfter)

;(async () => {
  const [{ scriptEl, context }, templateContent] = await monitored
  scriptEl.textContent = generate(templateContent, context)
})()

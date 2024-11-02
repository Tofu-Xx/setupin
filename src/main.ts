import { doByS, doByT, SCRIPT_TAG, TEMPLATE_TAG } from './doms'
import { generate } from './generate'
import { onAfter } from './monitor/onAfter'
import { onPrior } from './monitor/onPrior'
import { monito } from './tools'

const monitored = monito(onPrior, onAfter)

;(async () => {
  const carrier = await monitored
  const { scriptEl, context } = carrier.get(SCRIPT_TAG)
  const templateContent = carrier.get(TEMPLATE_TAG)
  scriptEl.textContent = generate(templateContent, context)
})()

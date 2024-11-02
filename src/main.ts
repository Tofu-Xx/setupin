import { generate } from '@/doms/generate'
import { SCRIPT_TAG, TEMPLATE_TAG } from '@/doms/root'
import { onAfter, onPrior } from '@/monitor'
import { monito } from '@/tools'

const origin = monito(onPrior, onAfter)

;(async () => {
  const terminal = await origin
  const { scriptEl, context } = terminal[SCRIPT_TAG]
  const templateContent = terminal[TEMPLATE_TAG]
  scriptEl.textContent = generate(templateContent, context)
})()

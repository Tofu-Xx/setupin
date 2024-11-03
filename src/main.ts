import type { carrier } from './doms/carrier'
import { onAfter, onPrior } from '@/discoverer'
import { TAG_SCRIPT, TAG_TEMPLATE } from '@/doms/data'
import { generate } from '@/doms/generate'
import { discover } from '@/tools'

const origin = discover<typeof carrier>(onPrior, onAfter)

;(async () => {
  const terminal = await origin
  const { scriptEl, context } = terminal[TAG_SCRIPT].parsed!
  const templateContent = terminal[TAG_TEMPLATE].parsed!
  scriptEl.textContent = generate(templateContent, context)
})()

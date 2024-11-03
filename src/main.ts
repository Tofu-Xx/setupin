import type { carrier } from './doms/carrier'
import { onAfter, onPrior } from '@/discoverer'
import { tagScript, tagTemplate } from '@/doms/data'
import { generate } from '@/doms/generate'
import { discover } from '@/tools'

const origin = discover<typeof carrier>(onPrior, onAfter)

;(async () => {
  const terminal = await origin
  const { scriptEl, context } = terminal[tagScript.str].parsed!
  const templateContent = terminal[tagTemplate.str].parsed!
  scriptEl.textContent = generate(templateContent, context)
})()

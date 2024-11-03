import type { carrier } from './store/doms'
import { tagScript, tagTemplate } from '@/data'
import { onAfter, onPrior } from '@/funcs/discoverer'
import { generate } from '@/funcs/generate'
import { discover } from '@/tools'

const origin = discover<typeof carrier>(onPrior, onAfter)

;(async () => {
  const terminal = await origin
  const { scriptEl, context } = terminal[tagScript.str].parsed!
  const templateContent = terminal[tagTemplate.str].parsed!
  scriptEl.textContent = generate(templateContent, context)
})()

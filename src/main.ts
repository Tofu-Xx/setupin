import type { carrier } from './store/carrier'
import { tagScript, tagTemplate } from '@/data'
import { onAfter, onPrior } from '@/funcs/discoverer'
import { generate } from '@/funcs/generate'
import { discover } from '@/tools'

(async () => {
  // const origin = discover<typeof carrier>(onPrior, onAfter)
  const discovery = await discover<typeof carrier>(onPrior, onAfter)
  const { scriptEl, context } = discovery[tagScript.str].parsed!
  const templateContent = discovery[tagTemplate.str].parsed!
  scriptEl.textContent = generate(templateContent, context)
})()

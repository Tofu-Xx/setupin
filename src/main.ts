import type { carrier } from './store/carrier'
import { tagScript, tagTemplate } from '@/data'
import { onAfter, onPrior } from '@/funcs/discoverer'
import { generate } from '@/funcs/generate'
import { discover } from '@/tools'

(async () => {
  const discovery = await discover<typeof carrier>(onPrior, onAfter)
  const { scriptEl, context } = discovery[tagScript.str].parsed!
  document.body.innerHTML = discovery[tagTemplate.str].parsed!
  scriptEl.innerHTML = generate(context)
})()

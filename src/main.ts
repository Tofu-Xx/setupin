import type { carrier } from '@/store/index'
import { tagScript, tagTemplate } from '@/data/index'
import { onAfter, onPrior } from '@/funcs/discoverer/index'
import { generate } from '@/funcs/generate'
import { discover } from '@/util/index'

(async () => {
  const discovery = await discover<typeof carrier>(onPrior, onAfter)
  document.body.innerHTML = discovery[tagTemplate.str].parsed!
  const { scriptEl, ...context } = discovery[tagScript.str].parsed!
  scriptEl!.innerHTML = generate(context)
})()

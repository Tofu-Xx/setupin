import type { carrier } from '@/store/carrier'
import { tagScript, tagTemplate } from '@/data'
import { onAfter, onPrior } from '@/funcs/discoverer'
import { discover } from '@/util'
import { generate } from './funcs/generate'

(async () => {
  const discovery = await discover<typeof carrier>(onPrior, onAfter)
  document.body.innerHTML = discovery[tagTemplate.str].parsed!
  generate(discovery[tagScript.str].parsed!)
})()

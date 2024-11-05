import type { carrier } from '@/store/carrier'
import { tagScript, tagTemplate } from '@/data'
import { onAfter, onPrior } from '@/funcs/discoverer'
import { discover } from '@/util'
import { generate } from './funcs/generate'

(async () => {
  const discovery = await discover<typeof carrier>(onPrior, onAfter)
  generate(discovery[tagTemplate.str].parsed!, discovery[tagScript.str].parsed!)
})()

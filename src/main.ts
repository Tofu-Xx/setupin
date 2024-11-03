import type { carrier } from './store/carrier'
import { tagScript, tagTemplate } from './data'
import { onAfter, onPrior } from './funcs/discoverer'
import { generate } from './funcs/generate'
import { discover } from './tools'

(async () => {
  const discovery = await discover<typeof carrier>(onPrior, onAfter)
  // const context =
  generate(discovery[tagTemplate.str].parsed!, discovery[tagScript.str].parsed!)
})()

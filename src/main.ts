import type { carrier } from '@/store'
import { tagScript, tagTemplate } from '@/data'
import { onAfter, onPrior } from '@/funcs/discoverer'
import { generate } from '@/funcs/generate'
import { discover } from '@/util'

console.log(__IS_PROD__)
export * from '@vendor/vue.esm'
(async () => {
  const discovery = await discover<typeof carrier>(onPrior, onAfter)
  document.body.innerHTML = discovery[tagTemplate.str].parsed!
  const { scriptEl, ...context } = discovery[tagScript.str].parsed!
  scriptEl!.innerHTML = generate(context)
})()

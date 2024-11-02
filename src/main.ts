import type { Carrier } from './doms/carrier'
import type { ParsedScript } from './doms/parse/parseScript'
import type { parsedTemplate } from './doms/parse/parseTemplate'
import { onAfter, onPrior } from '@/discoverer'
import { TAG_SCRIPT, TAG_TEMPLATE } from '@/doms/data'
import { generate } from '@/doms/generate'
import { discover } from '@/tools'

const origin = discover<Carrier>(onPrior, onAfter)

;(async () => {
  const terminal = await origin
  const { scriptEl, context } = terminal[TAG_SCRIPT].parsed!
  const templateContent = terminal[TAG_TEMPLATE].parsed!
  scriptEl.textContent = generate(templateContent, context)
})()

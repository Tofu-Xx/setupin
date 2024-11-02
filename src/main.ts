import type { DoneByScript } from './doms/root/doByScript'
import type { DoneByTemplate } from './doms/root/doByTemplate'
import type { RootTags } from './doms/rootTags'
import { onAfter, onPrior } from '@/discoverer'
import { generate } from '@/doms/generate'
import { SCRIPT_TAG, TEMPLATE_TAG } from '@/doms/root'
import { discover } from '@/tools'

const origin = discover<RootTags>(onPrior, onAfter)

;(async () => {
  const terminal = await origin
  const { scriptEl, context } = terminal[SCRIPT_TAG].parsed!
  const templateContent = terminal[TEMPLATE_TAG].parsed!
  scriptEl.textContent = generate(templateContent, context)
})()

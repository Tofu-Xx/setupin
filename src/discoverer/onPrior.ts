import type { Carrier } from '@/doms/carrier'
import type { OnPrior } from '@/tools'
import { carrier } from '@/doms/carrier'
import { behavior, TAG_SCRIPT, TAGS } from '@/doms/data'
import { isElMatch } from '@/tools/isElMatch'

enum STATE { WITHOUT, RELATE, CORRECT }
export const onPrior: OnPrior<Carrier> = ({ node, discovery }) => {
  Object.assign(discovery, carrier)
  function _getState(tag: ROOT_TAG): STATE {
    if (!isElMatch(node, tag)) return STATE.WITHOUT
    if (node.parentElement === document.head) return STATE.CORRECT
    else return STATE.RELATE
  }
  for (const tag of TAGS) {
    if (_getState(tag) !== STATE.CORRECT) continue
    let count = 0
    const { parse } = behavior[tag]
    count++
    if (count !== 1) continue
    discovery[tag].parsed = parse(node as any)
    discovery[tag].count = count
  }
  if (_getState(TAG_SCRIPT) === STATE.RELATE)
    node.innerHTML = '/* Resolved to the wrong location */'
}
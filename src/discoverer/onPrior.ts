import type { tagTemplate } from '@/doms/data'
import type { OnPrior } from '@/tools'
import { carrier } from '@/doms/carrier'
import { behavior, tags, tagScript } from '@/doms/data'
import { isElMatch } from '@/tools/isElMatch'

enum STATE { WITHOUT, RELATE, CORRECT }
export const onPrior: OnPrior<typeof carrier> = ({ node, discovery }) => {
  Object.assign(discovery, carrier)
  function _getState(tag: typeof tags[number]['str']): STATE {
    if (!isElMatch(node, tag)) return STATE.WITHOUT
    if (node.parentElement === document.head) return STATE.CORRECT
    else return STATE.RELATE
  }
  for (const { str } of tags) {
    if (_getState(str) !== STATE.CORRECT) continue
    let count = 0
    const { parse } = behavior[str]
    count++
    if (count !== 1) continue
    discovery[str].parsed = parse(node as any)
    discovery[str].count = count
  }
  if (_getState(tagScript.str) === STATE.RELATE)
    node.innerHTML = '/* Resolved to the wrong location */'
}

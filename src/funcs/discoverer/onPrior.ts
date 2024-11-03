import type { OnPrior } from '@/tools'
import { behavior, tags, tagScript } from '@/data'
import { carrier } from '@/store'
import { isElMatch } from '@/tools'

enum state { WITHOUT, RELATE, CORRECT }
const { WITHOUT, RELATE, CORRECT } = state
export const onPrior: OnPrior<typeof carrier> = ({ node, discovery }) => {
  Object.assign(discovery, carrier)
  function _getState(tag: typeof tags[number]['str']): state {
    if (!isElMatch(node, tag)) return WITHOUT
    if (node.parentElement === document.head) return CORRECT
    else return RELATE
  }
  for (const { str } of tags) {
    if (_getState(str) !== CORRECT) continue
    const { parse } = behavior[str]
    discovery[str].count++
    if (discovery[str].count !== 1) continue
    discovery[str].parsed = parse(node as any)
  }
  if (_getState(tagScript.str) === RELATE)
    behavior[tagScript.str].beNoHere(node)
}

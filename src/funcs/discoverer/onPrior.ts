import type { OnPrior } from '@/util'
import { behavior, tags, tagScript } from '@/data'
import { carrier } from '@/store'
import { isElMatch } from '@/util'

export const onPrior: OnPrior<typeof carrier> = ({ node, discovery }) => {
  enum state { WITHOUT, RELATE, CORRECT }
  const { WITHOUT, RELATE, CORRECT } = state
  Object.assign(discovery, carrier)
  function _getState(tag: typeof tags[number]['str']): state {
    if (!isElMatch(node, tag)) return WITHOUT
    if (node.parentElement === document.head) return CORRECT
    else return RELATE
  }
  for (const { str } of tags) {
    if (_getState(str) !== CORRECT) continue
    const { parse, beNoHere } = behavior[str]
    discovery[str].count++
    if (discovery[str].count !== 1) {
      beNoHere(node)
      continue
    }
    discovery[str].parsed = parse(node as any)
  }
  if (_getState(tagScript.str) === RELATE)
    behavior[tagScript.str].beNoHere(node)
}

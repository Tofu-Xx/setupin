import type { Carrier } from '@/doms/carrier'
import type { OnPrior } from '@/tools'
import { carrier } from '@/doms/carrier'
import { behavior, TAG_SCRIPT, TAG_TEMPLATE } from '@/doms/data'
import { isElMatch } from '@/tools/isElMatch'

enum TAG_TYPE {
  WITHOUT,
  RELATE,
  CORRECT,
}
export const onPrior: OnPrior<Carrier> = ({ node, discovery }) => {
  Object.assign(discovery, carrier)
  function _isRoot(tag: ROOT_TAG): TAG_TYPE {
    if (!isElMatch(node, tag))
      return TAG_TYPE.WITHOUT
    if (node.parentElement === document.head)
      return TAG_TYPE.CORRECT
    else
      return TAG_TYPE.RELATE
  }
  if (_isRoot(TAG_TEMPLATE) === TAG_TYPE.CORRECT) {
    if (!discovery[TAG_TEMPLATE].count) {
      discovery[TAG_TEMPLATE].parsed = behavior[TAG_TEMPLATE].parse(node as Tag['template'])
      discovery[TAG_TEMPLATE].count = 0
    }
    discovery[TAG_TEMPLATE].count++
  }
  if (_isRoot(TAG_SCRIPT) === TAG_TYPE.CORRECT) {
    if (!discovery[TAG_SCRIPT].count) {
      discovery[TAG_SCRIPT].parsed = behavior[TAG_SCRIPT].parse(node as Tag['script'])
      discovery[TAG_SCRIPT].count = 0
    }
    discovery[TAG_SCRIPT].count++
  }
  if (_isRoot(TAG_SCRIPT) === TAG_TYPE.RELATE)
    node.innerHTML = '/* Resolved to the wrong location */'
}

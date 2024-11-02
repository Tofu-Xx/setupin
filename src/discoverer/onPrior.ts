import type { RootTags } from '@/doms/rootTags'
import type { OnPrior } from '@/tools'
import { root, SCRIPT_TAG, TAG_TYPE, TEMPLATE_TAG } from '@/doms/root'
import { rootTags } from '@/doms/rootTags'
import { isElMatch } from '@/tools/isElMatch'

export const onPrior: OnPrior<RootTags> = ({ node, discovery }) => {
  Object.assign(discovery, rootTags)
  function _isRoot(tag: ROOT_TAG): TAG_TYPE {
    if (!isElMatch(node, tag))
      return TAG_TYPE.WITHOUT
    if (node.parentElement === document.head)
      return TAG_TYPE.CORRECT
    else
      return TAG_TYPE.RELATE
  }
  if (_isRoot(TEMPLATE_TAG) === TAG_TYPE.CORRECT) {
    if (!discovery[TEMPLATE_TAG].count) {
      discovery[TEMPLATE_TAG].parsed = root[TEMPLATE_TAG].doBy(node as Tag['template'])
      discovery[TEMPLATE_TAG].count = 0
    }
    discovery[TEMPLATE_TAG].count++
  }
  if (_isRoot(SCRIPT_TAG) === TAG_TYPE.CORRECT) {
    if (!discovery[SCRIPT_TAG].count) {
      discovery[SCRIPT_TAG].parsed = root[SCRIPT_TAG].doBy(node as Tag['script'])
      discovery[SCRIPT_TAG].count = 0
    }
    discovery[SCRIPT_TAG].count++
  }
  if (_isRoot(SCRIPT_TAG) === TAG_TYPE.RELATE)
    node.innerHTML = '/* Resolved to the wrong location */'
}

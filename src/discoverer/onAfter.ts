import type { RootTags } from '@/doms/rootTags'
import type { OnAfter } from '@/tools'
import { root, SCRIPT_TAG, TEMPLATE_TAG } from '@/doms/root'

export const onAfter: OnAfter<RootTags> = ({ discovery }) => {
  if (discovery[SCRIPT_TAG].count === 0) {
    root[SCRIPT_TAG].lose()
    discovery[SCRIPT_TAG].parsed = root[SCRIPT_TAG].doBy()
  }
  if (discovery[TEMPLATE_TAG].count === 0) {
    root[TEMPLATE_TAG].lose()
    discovery[TEMPLATE_TAG].parsed = root[TEMPLATE_TAG].doBy()
  }
  if (discovery[SCRIPT_TAG].count > 1) {
    root[SCRIPT_TAG].excess()
  }
  if (discovery[TEMPLATE_TAG].count > 1) {
    root[TEMPLATE_TAG].excess()
  }
}

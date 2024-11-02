import type { Carrier } from '@/doms/carrier'
import type { OnAfter } from '@/tools'
import { behavior, TAG_SCRIPT, TAG_TEMPLATE } from '@/doms/data'

export const onAfter: OnAfter<Carrier> = ({ discovery }) => {
  if (discovery[TAG_SCRIPT].count === 0) {
    behavior[TAG_SCRIPT].lose()
    discovery[TAG_SCRIPT].parsed = behavior[TAG_SCRIPT].parse()
  }
  if (discovery[TAG_TEMPLATE].count === 0) {
    behavior[TAG_TEMPLATE].lose()
    discovery[TAG_TEMPLATE].parsed = behavior[TAG_TEMPLATE].parse()
  }
  if (discovery[TAG_SCRIPT].count > 1) {
    behavior[TAG_SCRIPT].excess()
  }
  if (discovery[TAG_TEMPLATE].count > 1) {
    behavior[TAG_TEMPLATE].excess()
  }
}

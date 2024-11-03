import type { Carrier } from '@/doms/carrier'
import type { OnAfter } from '@/tools'
import { behavior, TAGS } from '@/doms/data'

export const onAfter: OnAfter<Carrier> = ({ discovery }) => {
  for (const tag of TAGS) {
    const { count } = discovery[tag]
    const { lose, excess, parse } = behavior[tag]
    if (count === 0) {
      lose()
      discovery[tag].parsed = parse()
    }
    if (count > 1) {
      excess()
    }
  }
}

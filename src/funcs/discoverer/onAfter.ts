import type { OnAfter } from '@/util'
import { behavior, tags } from '@/data'

export const onAfter: OnAfter = ({ discovery }) => {
  for (const { str } of tags) {
    const { count } = discovery[str]
    const { lose, excess, parse } = behavior[str]
    if (count === 0) {
      lose(`not found ${str} in top level for document`)
      discovery[str].parsed = parse()
    }
    count > 1 && excess(`only one ${str} is allowed in top level for document`)
  }
}

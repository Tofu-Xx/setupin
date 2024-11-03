import type { OnAfter } from '../../tools'
import { behavior, tags } from '../../data'

export const onAfter: OnAfter = ({ discovery }) => {
  for (const { str } of tags) {
    const { count } = discovery[str]
    const { lose, excess, parse } = behavior[str]
    if (count === 0) {
      lose()
      discovery[str].parsed = parse()
    }
    count > 1 && excess()
  }
}

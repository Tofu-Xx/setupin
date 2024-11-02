import type { Result } from '../result'
import { doByS, root } from '../doms'
import { carrier } from '../doms/carrier'



export const resolver = (() => {
  const data = [null, null]
  return function (tag: ROOT_TAG, resolve: Fn, target?: Element) {
    const { doBy, idx, lose } = root[tag]
    if (carrier.newly(tag, target?.innerHTML ?? '')) {
      data[idx] = doBy(target)
      if (!target) {
        lose()
      }
      if (data.every(e => e !== null))
        resolve(data)
    }
  }
})()

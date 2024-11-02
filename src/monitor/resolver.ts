import type { Result } from '../result'
import { doByS, root } from '../root_tag'
import { Carrier } from '../root_tag/carrier'

const domCarrier = new Carrier<ROOT_TAG, string>()

export const resolver = (() => {
  const data = [null, null]
  return function (tag: ROOT_TAG, resolve: Fn, target?: Element) {
    const { doBy, idx, lose } = root[tag]
    if (domCarrier.newly(tag, target?.innerHTML ?? '')) {
      data[idx] = doBy(target)
      if (!target) {
        lose()
      }
      if (data.every(e => e !== null))
        resolve(data)
    }
  }
})()

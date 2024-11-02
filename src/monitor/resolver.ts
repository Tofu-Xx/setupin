import type { Result } from '../result'
import { doByS, root } from '../doms'
import { carrier } from '../doms/carrier'

export const resolver = (() => {
  // const data = [null, null]
  return function (tag: ROOT_TAG, resolve: Fn, target?: Element) {
    const { doBy, lose } = root[tag]
    if (carrier.newly(tag, doBy(target))) {
      target || lose()
      if (carrier.size === 2)
        resolve(carrier)
    }
  }
})()

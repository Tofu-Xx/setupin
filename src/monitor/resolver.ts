import { bus, byBus, stops } from '@/doms/bus'
import { root } from '@/doms/root'

export const resolver = (() => {
  return function (tag: ROOT_TAG, resolve: Fn, target?: Element) {
    const { doBy, lose } = root[tag]
    if (byBus(tag, doBy(target as any))) {
      target || lose()
      if (stops() === 2)
        resolve(bus)
    }
  }
})()

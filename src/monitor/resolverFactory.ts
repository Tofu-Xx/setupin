import { bus, byBus, stops } from '@/doms/bus'
import { root } from '@/doms/root'

export function resolverFactory(resolve: Fn) {
  return function resolver(tag: ROOT_TAG, target?: Element) {
    const { doBy, lose } = root[tag]
    if (byBus(tag, doBy(target as any))) {
      target || lose()
      if (stops() === 2)
        resolve(bus)
    }
  }
}

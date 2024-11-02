import type { Result } from '../result'
import { doByS, root } from '../root_tag'

(window as any).doms = new Map()
export const finder = (() => {
  const data = [null, null]
  return function (tag: ROOT_TAG, resolve: Fn, target?: Element) {
    const { doBy, idx, lose } = root[tag]
    if ((window as any).doms.has(tag)) {
      return
    }
    ((window as any).doms as Map<ROOT_TAG, string>).set(tag, target?.innerHTML ?? '')
    const { ok, isErr } = doBy(target)
    if (isErr)
      return
    data[idx] = ok as any
    if (!target) {
      lose()
    }
    if (data.every(e => e !== null))
      resolve(data)
  }
})()

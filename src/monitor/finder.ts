import type { Result } from '../result'
import { doByS, root } from '../rootTag'

export const finder = (() => {
  const data = [null, null]
  // return function (fn: Fn<any, Result>, target: Element | ROOT_TAGS, resolve: Fn) {
  return function (tag: ROOT_TAG, resolve: Fn, target?: Element) {
    const { doBy, idx, lose } = root[tag]
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

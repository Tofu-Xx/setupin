import type { ROOT_TAGS } from '../doBy'
import type { Result } from '../result'
import { doByS } from '../doBy/script'

export const finder = (() => {
  const data = [null, null]
  return function (fn: Fn<any, Result>, target: Element | ROOT_TAGS, resolve: Fn) {
    const [i, type] = fn === doByS ? [0, 'warn'] : [1, 'error']
    const arg = typeof target === 'string' ? null : target
    const { ok, isErr } = fn(arg)
    if (isErr)
      return
    data[i] = ok
    if (!arg) {
      ;(console as any)[type](`not found ${target} in root node`)
    }
    if (data.every(e => e !== null))
      resolve(data)
  }
})()

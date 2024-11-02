import type { DoneByS } from '../doBy/script'
import type { DoneByT } from '../doBy/template'
import type { OnAfter, OnPrior } from '../tools/monito'
import { doByS, doByT, SCRIPT_TAG, TEMPLATE_TAG } from '../doBy'
import { when } from '../tools'
import { finder } from './finder'
import { verdict } from './verdict'

export type Data = [DoneByS, DoneByT]
export const onPrior: OnPrior<Data> = ({ node, resolve }) => {
  verdict(TEMPLATE_TAG, node).ok && finder(doByT, node as Element, resolve)
  when(node, verdict(SCRIPT_TAG, node).ok)({
    true: (n: Element) => finder(doByS, n, resolve),
    false: (n: Element) => (n).textContent = '/* Resolved to the wrong location */',
  })
}
export const onAfter: OnAfter<Data> = ({ resolve }) => {
  finder(doByS, SCRIPT_TAG, resolve)
  finder(doByT, TEMPLATE_TAG, resolve)
}

import type { DoneByS } from '../doBy/script'
import type { DoneByT } from '../doBy/template'
import type { OnAfter, OnPrior } from '../tools/monito'
import { doByS, doByT } from '../doBy'
import { when } from '../tools'
import { finder } from './finder'
import { isSite } from './isSite'

export type Data = [DoneByS, DoneByT]
export const onPrior: OnPrior<Data> = ({ node, resolve }) => {
  isSite(node, 'template').ok && finder(doByT, node as Element, resolve)
  when(node, isSite(node, 'script', 'setup').ok)({
    true: (n: Element) => finder(doByS, n, resolve),
    false: (n: Element) => (n).textContent = '/* Resolved to the wrong location */',
  })
}
export const onAfter: OnAfter<Data> = ({ resolve }) => {
  finder(doByS, '<script setup>', resolve)
  finder(doByT, '<template>', resolve)
}

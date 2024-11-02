import type { DoneByS } from '../rootTag/script'
import type { DoneByT } from '../rootTag/template'
import type { OnAfter, OnPrior } from '../tools/monito'
import { SCRIPT_TAG, TEMPLATE_TAG } from '../rootTag'
import { when } from '../tools'
import { finder } from './finder'
import { verdict } from './verdict'

export type Data = [DoneByS, DoneByT]
export const onPrior: OnPrior<Data> = ({ node, resolve }) => {
  verdict(TEMPLATE_TAG, node).ok && finder(TEMPLATE_TAG, resolve, node as Element)
  when(verdict(SCRIPT_TAG, node).ok)({
    true: () => finder(SCRIPT_TAG, resolve, node as Element),
    false: () => (node.textContent = '/* Resolved to the wrong location */'),
  })
}
export const onAfter: OnAfter<Data> = ({ resolve }) => {
  finder(SCRIPT_TAG, resolve)
  finder(TEMPLATE_TAG, resolve)
}

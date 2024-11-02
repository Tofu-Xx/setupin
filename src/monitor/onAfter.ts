import type { OnAfter } from '../tools'
import type { Data } from './onPrior'
import { SCRIPT_TAG, TEMPLATE_TAG } from '../root_tag'
import { resolver } from './resolver'

export const onAfter: OnAfter<Data> = ({ resolve }) => {
  resolver(SCRIPT_TAG, resolve)
  resolver(TEMPLATE_TAG, resolve)
}

import type { Carrier } from '../doms/carrier'
import type { OnAfter } from '../tools'
import { SCRIPT_TAG, TEMPLATE_TAG } from '../doms'
import { resolver } from './resolver'

export const onAfter: OnAfter<Carrier> = ({ resolve }) => {
  resolver(SCRIPT_TAG, resolve)
  resolver(TEMPLATE_TAG, resolve)
}

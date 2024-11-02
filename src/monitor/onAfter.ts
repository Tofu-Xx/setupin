import type { Bus } from '@/doms/bus'
import type { OnAfter } from '@/tools'
import { SCRIPT_TAG, TEMPLATE_TAG } from '@/doms/root'
import { resolver } from './resolver'

export const onAfter: OnAfter<Bus> = ({ resolve }) => {
  resolver(SCRIPT_TAG, resolve)
  resolver(TEMPLATE_TAG, resolve)
}

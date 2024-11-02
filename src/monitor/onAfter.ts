import type { Bus } from '@/doms/bus'
import type { OnAfter } from '@/tools'
import { SCRIPT_TAG, TEMPLATE_TAG } from '@/doms/root'
import { resolverFactory } from './resolverFactory'

export const onAfter: OnAfter<Bus> = ({ resolve }) => {
  const rslv = resolverFactory(resolve)
  rslv(SCRIPT_TAG)
  rslv(TEMPLATE_TAG)
}

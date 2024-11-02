import type { DoneByS, DoneByT, SCRIPT_TAG, TEMPLATE_TAG } from './root'

export interface Bus {
  [SCRIPT_TAG]: DoneByS
  [TEMPLATE_TAG]: DoneByT
}

export const bus: Bus = Object.create(null)

export function byBus(k: ROOT_TAG, v: DoneByS | DoneByT) {
  if (k in bus) {
    return false
  }
  bus[k] = v as any
  return true
}

export function stops() {
  return Object.keys(bus).length
}

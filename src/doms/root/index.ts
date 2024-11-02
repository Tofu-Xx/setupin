import { doByS } from './doByS'
import { doByT } from './doByT'

export type { DoneByS } from './doByS'
export type { DoneByT } from './doByT'
export const SCRIPT_TAG = '<script setup>' as const
export const TEMPLATE_TAG = '<template>' as const
export const root = {
  [SCRIPT_TAG]: {
    lose: () => console.warn(`not found ${SCRIPT_TAG} in top level for document`),
    excess: () => console.warn(`only one ${SCRIPT_TAG} is allowed in top level for document`),
    doBy: doByS,
  },
  [TEMPLATE_TAG]: {
    lose: () => console.error(`not found ${TEMPLATE_TAG} in top level for document`),
    excess: () => console.warn(`only one ${TEMPLATE_TAG} is allowed in top level for document`),
    doBy: doByT,
  },
}

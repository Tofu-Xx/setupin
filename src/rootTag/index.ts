import { doByS } from './script'
import { doByT } from './template'

export * from './script'
export * from './template'

export const SCRIPT_TAG: ROOT_TAG = '<script setup>'
export const TEMPLATE_TAG: ROOT_TAG = '<template>'

export const root = {
  [SCRIPT_TAG]: {
    idx: 0,
    lose: () => console.warn(`not found ${SCRIPT_TAG} in top level for document`),
    excess: () => console.warn(`only one ${SCRIPT_TAG} is allowed in top level for document`),
    doBy: doByS,
  },
  [TEMPLATE_TAG]: {
    idx: 1,
    lose: () => console.error(`not found ${TEMPLATE_TAG} in top level for document`),
    excess: () => console.warn(`only one ${TEMPLATE_TAG} is allowed in top level for document`),
    doBy: doByT,
  },
}

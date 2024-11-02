import { doByScript } from './doByScript'
import { doByTemplate } from './doByTemplate'

export type { DoneByScript as DoneByS } from './doByScript'
export type { DoneByTemplate as DoneByT } from './doByTemplate'
export const SCRIPT_TAG = '<script setup>' as const
export const TEMPLATE_TAG = '<template>' as const
export enum TAG_TYPE {
  WITHOUT,
  RELATE,
  CORRECT,
}
export const root = {
  [SCRIPT_TAG]: {
    lose: () => console.warn(`not found ${SCRIPT_TAG} in top level for document`),
    excess: () => console.warn(`only one ${SCRIPT_TAG} is allowed in top level for document`),
    doBy: doByScript,
  },
  [TEMPLATE_TAG]: {
    lose: () => console.error(`not found ${TEMPLATE_TAG} in top level for document`),
    excess: () => console.warn(`only one ${TEMPLATE_TAG} is allowed in top level for document`),
    doBy: doByTemplate,
  },
}

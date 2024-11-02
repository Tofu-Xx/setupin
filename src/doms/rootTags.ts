import type { DoneByScript } from './root/doByScript'
import type { DoneByTemplate } from './root/doByTemplate'
import { DoneByS, DoneByT, SCRIPT_TAG, TEMPLATE_TAG } from './root'

export interface RootTags {
  [SCRIPT_TAG]: {
    parsed: Option<DoneByScript>
    count: number
  }
  [TEMPLATE_TAG]: {
    parsed: Option<DoneByTemplate>
    count: number
  }
}
export const rootTags: RootTags = {
  [SCRIPT_TAG]: {
    parsed: null,
    count: 0,
  },
  [TEMPLATE_TAG]: {
    parsed: null,
    count: 0,
  },
}

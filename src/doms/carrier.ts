import type { ParsedScript } from './parse/parseScript'
import type { parsedTemplate } from './parse/parseTemplate'
import { TAG_SCRIPT, TAG_TEMPLATE } from './data'

export interface Carrier {
  [TAG_SCRIPT]: {
    parsed: Option<ParsedScript>
    count: number
  }
  [TAG_TEMPLATE]: {
    parsed: Option<parsedTemplate>
    count: number
  }
}
export const carrier: Carrier = {
  [TAG_SCRIPT]: {
    parsed: null,
    count: 0,
  },
  [TAG_TEMPLATE]: {
    parsed: null,
    count: 0,
  },
}

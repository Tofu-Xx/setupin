import type { ParsedScript } from './parse/parseScript'
import type { parsedTemplate } from './parse/parseTemplate'
import { TAG_SCRIPT, TAG_TEMPLATE } from './data'

function createCarrier<P>(count: number, parsed: P) {
  return { count, parsed }
}

export const carrier = {
  [TAG_SCRIPT]: createCarrier<Option<ParsedScript>>(0, null),
  [TAG_TEMPLATE]: createCarrier<Option<parsedTemplate>>(0, null),
}

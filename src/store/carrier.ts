import type { ParsedScript, ParsedTemplate } from '@/funcs/parse/index'

import { tagScript, tagTemplate } from '@/data/index'

function newCarrier<P>(count: number, parsed: P) {
  return { count, parsed }
}

export const carrier = {
  [tagScript.str]: newCarrier<Option<ParsedScript>>(0, null),
  [tagTemplate.str]: newCarrier<Option<ParsedTemplate>>(0, null),
} as const

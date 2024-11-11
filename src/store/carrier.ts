import type { ParsedScript, ParsedTemplate } from '@/funcs/parse'

import { tagScript, tagTemplate } from '@/data'

function createCarrier<P>(count: number, parsed: P) {
  return { count, parsed }
}

export const carrier = {
  [tagScript.str]: createCarrier<Option<ParsedScript>>(0, null),
  [tagTemplate.str]: createCarrier<Option<ParsedTemplate>>(0, null),
} as const

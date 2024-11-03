import type { ParsedScript } from './parse/parseScript'
import type { parsedTemplate } from './parse/parseTemplate'
import { tagScript, tagTemplate } from './data'

function newCarrier<P>(count: number, parsed: P) {
  return { count, parsed }
}

export const carrier = {
  [tagScript.str]: newCarrier<Option<ParsedScript>>(0, null),
  [tagTemplate.str]: newCarrier<Option<parsedTemplate>>(0, null),
} as const

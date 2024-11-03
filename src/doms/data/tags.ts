import { parseScript } from '../parse/parseScript'
import { parseTemplate } from '../parse/parseTemplate'

function newTag<S extends string, P>(str: S, parse: Fn<any, P>, logType: { lose: Fn, excess: Fn }) {
  return { str, parse, logType }
}
export const tagScript = newTag('<script setup>', parseScript, { lose: console.warn, excess: console.warn })
export const tagTemplate = newTag('<template>', parseTemplate, { lose: console.error, excess: console.warn })
export const tags = [tagScript, tagTemplate] as const

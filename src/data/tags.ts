import { parseScript } from '../funcs/parse/parseScript'
import { parseTemplate } from '../funcs/parse/parseTemplate'

function newTag<S extends string, P>(str: S, parse: Fn<any, P>, logType: { lose: Fn, excess: Fn }, annotation: string) {
  return { str, parse, logType, beNoHere: annotation.replace(/%s/g, `${str} is not supposed to be here`) }
}
export const tagScript = newTag('<script setup>', parseScript, { lose: console.warn, excess: console.warn }, '/* %s */')
export const tagTemplate = newTag('<template>', parseTemplate, { lose: console.error, excess: console.warn }, '<!-- %s -->')
export const tags = [tagScript, tagTemplate] as const

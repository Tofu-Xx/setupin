import type { tags } from './tags'
import { tagScript, tagTemplate } from './tags'

function createBehavior(tag: typeof tags[number]) {
  const { parse, logType, beNoHere } = tag
  return {
    ...logType,
    beNoHere: (node: Element) => (node.innerHTML = beNoHere),
    parse,
  }
}

export const behavior = {
  [tagScript.str]: createBehavior(tagScript),
  [tagTemplate.str]: createBehavior(tagTemplate),
} as const

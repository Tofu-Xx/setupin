import type { tags } from './tags'
import { tagScript, tagTemplate } from './tags'

function createBehavior(tag: typeof tags[number]) {
  const { str, parse, logType: { lose, excess }, beNoHere } = tag
  return {
    lose: () => lose(`not found ${str} in top level for document`),
    excess: () => excess(`only one ${str} is allowed in top level for document`),
    beNoHere: (node: Element) => (node.innerHTML = beNoHere),
    parse,
  }
}

export const behavior = {
  [tagScript.str]: createBehavior(tagScript),
  [tagTemplate.str]: createBehavior(tagTemplate),
}

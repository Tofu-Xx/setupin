import type { tags } from './tags'
import { parseScript } from '../funcs/parse/parseScript'
import { parseTemplate } from '../funcs/parse/parseTemplate'
import { tagScript, tagTemplate } from './tags'

function createBehavior(tag: typeof tags[number]) {
  const { str, parse, logType: { lose, excess } } = tag
  return {
    lose: () => lose(`not found ${str} in top level for document`),
    excess: () => excess(`only one ${str} is allowed in top level for document`),
    parse,
  }
}

export const behavior = {
  [tagScript.str]: createBehavior(tagScript),
  [tagTemplate.str]: createBehavior(tagTemplate),
}

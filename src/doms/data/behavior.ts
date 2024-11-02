import { parseScript } from '../parse/parseScript'
import { parseTemplate } from '../parse/parseTemplate'
import { TAG_SCRIPT, TAG_TEMPLATE } from './tags'

export const behavior = {
  [TAG_SCRIPT]: {
    lose: () => console.warn(`not found ${TAG_SCRIPT} in top level for document`),
    excess: () => console.warn(`only one ${TAG_SCRIPT} is allowed in top level for document`),
    parse: parseScript,
  },
  [TAG_TEMPLATE]: {
    lose: () => console.error(`not found ${TAG_TEMPLATE} in top level for document`),
    excess: () => console.warn(`only one ${TAG_TEMPLATE} is allowed in top level for document`),
    parse: parseTemplate,
  },
}

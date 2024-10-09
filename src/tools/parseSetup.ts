import { once } from './once'

export const parseSetup = once((setupText: string) => {
  const globalVarRegex = /(?:let|const|function)\s+\[?\{?\s*([a-zA-Z_$][\w$,\s]*)\b/g
  const localArea = /\{([^}]*)\}/g
  const retNames = [...setupText.replace(localArea, '').matchAll(globalVarRegex)].flatMap(match => match[1].split(',').map(v => v.trim()))
  return {
    setup: new Function(`${setupText} return { ${retNames.join(',')} }`),
  }
})

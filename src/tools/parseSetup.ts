export function parseSetup(scriptContent: string) {
  const globalVarRegex = /(?:let|const|function)\s+\[?\{?\s*([a-zA-Z_$][\w$,\s]*)\b/g
  const localArea = /\{([^}]*)\}/g
  return [...scriptContent.replace(localArea, '').matchAll(globalVarRegex)].flatMap(match => match[1].split(',').map(v => v.trim()))
}

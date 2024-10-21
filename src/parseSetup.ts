function getNested(text: string): string[] {
  let level = 0
  const result: string[] = []
  let current = ''

  for (const char of text) {
    if (char === '{' && level++)
      current += level > 1 ? char : ''
    else if (char === '}' && --level)
      current += level ? char : ''
    else if (level)
      current += char

    if (level === 0 && current) {
      result.push(current)
      current = ''
    }
  }

  return result
}

export function parseSetup(setupScript: HTMLScriptElement) {
  const varRex = /(?:let|const|function|var)(\s+|\s+(\[|\{)\s*)([a-zA-Z_$][\w$,\s]*)\b/g
  const commentsRex = /\/\*([^*]|\*[^/])*\*\/|\/\/.*/g
  const importsRex = /import[^(].+/g
  const setupText = setupScript.textContent!.replace(commentsRex, '')
  setupScript.remove()
  let globalAreasText = getNested(setupText).filter(text => /let|const|var|function/.test(text)).reduce((prev, curr) => {
    return prev.replace(curr, '')
  }, setupText)
  if (importsRex.test(globalAreasText)) {
    globalAreasText = globalAreasText.replace(importsRex, '')
    console.warn('Cannot use import statement outside a module.')
  }
  const retNames = Array.from(globalAreasText.matchAll(varRex), el => el[3]).join(',')
  return {
    setup: new Function(`for (const k in Vue) window[k] = Vue[k]; ${setupText} return { ${retNames} }`),
  }
}

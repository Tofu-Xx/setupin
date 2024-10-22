function getNested(code: string): string[] {
  let block = ''
  let level = 0
  const actions = {
    '{': () => level++,
    '}': () => level--,
  }
  return [...code].reduce((blocks, char) => {
    actions[char]?.()
    block = level > 0
      ? block + char
      : block && (blocks.push(block.slice(1)), '')
    return blocks
  }, [] as string[])
}

export function parseSetup(setupScript: HTMLScriptElement) {
  const varRex = /(?:let|const|function|var)(\s+|\s+(\[|\{)\s*)([a-zA-Z_$][\w$,\s]*)\b/g
  const commentsRex = /\/\*([^*]|\*[^/])*\*\/|\/\/.*/g
  const importsRex = /import[^(].+/g
  const setupText = setupScript.textContent!.replace(commentsRex, '')
  setupScript.remove()
  let globalAreasText = getNested(setupText).filter(text => /let|const|var|function/.test(text)).reduce((prev, curr) => prev.replace(curr, ''), setupText)
  if (importsRex.test(globalAreasText)) {
    globalAreasText = globalAreasText.replace(importsRex, '')
    console.warn('Cannot use import statement outside a module.')
  }
  const retNames = Array.from(globalAreasText.matchAll(varRex), el => el[3]).join(',')
  return {
    setup: new Function(`for (const k in Vue) window[k] = Vue[k]; ${setupText} return { ${retNames} }`),
  }
}

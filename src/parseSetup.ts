let hasSetup = false

export function parseSetup(setupScript: HTMLScriptElement) {
  hasSetup = true
  const setupText = setupScript.textContent || ''
  setupScript.remove()
  return {
    setup: new Function(`for (const k in Vue) window[k] = Vue[k]; ${setupText} return { ${paresSetupText(setupText)} }`),
  }
}

document.addEventListener('DOMContentLoaded', () => {
  hasSetup || console.warn('No setup found')
})

function paresSetupText(setupText: string) {
  const commentsRex = /\/\*([^*]|\*[^/])*\*\/|\/\/.*/g
  const stringRex = /(['"`])(?:(?!\1)[^\\]|\\.)*?\1/g
  const varRex = /(?:let|const|function|var)(\s+|\s+(\[|\{)\s*)([a-zA-Z_$][\w$,\s]*)\b/g
  /* 获取顶层域 */
  let globalAreasText = getNested(setupText).filter(text => /let|const|var|function/.test(text)).reduce((prev, curr) => prev.replace(curr, ''), setupText)
  if (/import[^(].+/.test(globalAreasText)) {
    throw new Error('Cannot use import statement outside a module.')
  }
  /* 排除注释和字符串 */
  globalAreasText = globalAreasText.replace(commentsRex, '').replace(stringRex, '')
  return Array.from(globalAreasText.matchAll(varRex), el => el[3]).join(',')
}

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

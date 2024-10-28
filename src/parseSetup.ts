let hasSetup = false

export function parseSetup(setupScript: HTMLScriptElement) {
  hasSetup = true
  const setupText = setupScript.textContent || ''
  if (/import[^(].+/.test(setupText)) {
    throw new Error('Cannot use import statement outside a module.')
  }
  setupScript.remove()
  const retNames = parseSetupText(setupText)
  return {
    setup: new Function(`for (const k in Vue) window[k] = Vue[k]; ${setupText} return { ${retNames} }`),
  }
}

document.addEventListener('DOMContentLoaded', () => {
  hasSetup || console.warn('No setup found')
})

function parseSetupText(setupText: string) {
  const stringRex = /(['"`])(?:(?!\1)[^\\]|\\.)*?\1/g
  const commentsRex = /\/\*([^*]|\*[^/])*\*\/|\/\/.*/g
  const varRex = /(?:let|const|function|var)(\s+|\s+(\[|\{)\s*)([a-zA-Z_$][\w$,\s]*)\b/g
  /* 获取顶层域 */

  const globalAreasText = getNested(setupText).filter(text => /let|const|var|function/.test(text)).reduce((prev, curr) => prev.replace(curr, ''), setupText)

  /* 排除注释和字符串 */
  const neatText = globalAreasText.replace(stringRex, '\n').replace(commentsRex, '\n')
  return Array.from(neatText.matchAll(varRex), el => el[3]).join(',')
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

export function parseSetup(setupScript: HTMLScriptElement) {
  const varRex = /(?:let|const|function|var)\s+\[?\{?\s*([a-zA-Z_$][\w$,\s]*)\b/g
  const localAreaRex = /\{[^{}]*\b(?:let|const|var|function)\b[^{}]*\}/g
  const commentsRex = /\/\*([^*]|\*[^/])*\*\/|\/\/.*/g
  const importsRex = /import[^(].+/g
  const setupText = setupScript.textContent!
  setupScript.remove()
  let globalAreasText = setupText.replace(localAreaRex, '').replace(commentsRex, '')
  if (importsRex.test(globalAreasText)) {
    globalAreasText = globalAreasText.replace(importsRex, '')
    console.warn('Cannot use import statement outside a module.')
  }
  const retNames = Array.from(globalAreasText.matchAll(varRex), ([_, v]) => v).join(',')
  return {
    setup: new Function(`for (const k in Vue) window[k] = Vue[k]; ${setupText} return { ${retNames} }`),
  }
}

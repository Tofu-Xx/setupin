export function parseSetup(setupScript: HTMLScriptElement) {
  const varRex = /(?:let|const|function|var)\s+\[?\{?\s*([a-zA-Z_$][\w$,\s]*)\b/g
  const localAreaRex = /\{[^{}]*\b(?:let|const|var|function)\b[^{}]*\}/g
  const commentsRex = /\/\*([^*]|\*[^/])*\*\/|\/\/.*/g
  const setupText = setupScript.textContent!
  setupScript.remove()
  const setupglobalText = setupText.replace(localAreaRex, '').replace(commentsRex, '')
  const retNames = Array.from(setupglobalText.matchAll(varRex), ([_, v]) => v).join(',')
  return {
    setup: new Function(`for (const k in Vue) window[k] = Vue[k]; ${setupText} return { ${retNames} }`),
  }
}

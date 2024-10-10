let App: any

function parse(setupScript: HTMLScriptElement) {
  const varRex = /(?:let|const|function|var)\s+\[?\{?\s*([a-zA-Z_$][\w$,\s]*)\b/g
  const localAreaRex = /\{[^{}]*\b(?:let|const|var|function)\b[^{}]*\}/g
  const commentsRex = /\/\*([^*]|\*[^/])*\*\/|\/\/.*/g
  const setupText = setupScript.textContent!
  const setupglobalText = setupText.replace(localAreaRex, '').replace(commentsRex, '')
  const retNames = Array.from(setupglobalText.matchAll(varRex), ([_, v]) => v).join(',')
  return {
    setup: new Function(`${setupText} return { ${retNames} }`),
  }
}

new MutationObserver((mutations, observer) => {
  for (const mutation of mutations) {
    const el = mutation.target as HTMLElement
    if (el.tagName === 'SCRIPT' && el.hasAttribute('setup')) {
      App = parse(el as HTMLScriptElement)
      el.remove()
      observer.disconnect()
    }
  }
}).observe(document, {
  childList: true,
  subtree: true,
})

document.addEventListener('DOMContentLoaded', () => {
  window.createApp(App).mount('[data-setupin-template]')
})

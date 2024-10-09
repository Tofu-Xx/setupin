let setupText = ''

new MutationObserver((mutations, observer) => {
  for (const mutation of mutations) {
    const el = mutation.target as HTMLElement
    if (el.tagName === 'SCRIPT' && el.hasAttribute('setup')) {
      setupText = el.textContent!
      el.remove()
      observer.disconnect()
    }
  }
}).observe(document, {
  childList: true,
  subtree: true,
})

document.addEventListener('DOMContentLoaded', () => {
  const globalVarRegex = /(?:let|const|function)\s+\[?\{?\s*([a-zA-Z_$][\w$,\s]*)\b/g
  const localArea = /\{([^}]*)\}/g
  const retNames = [...setupText.replace(localArea, '').matchAll(globalVarRegex)].flatMap(match => match[1].split(',').map(v => v.trim()))
  window.createApp({
    setup: new Function(`${setupText} return { ${retNames.join(',')} }`),
  }).mount(document.body)
})

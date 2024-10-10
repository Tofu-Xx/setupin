const varRex = /(?:let|const|function|var)\s+\[?\{?\s*([a-zA-Z_$][\w$,\s]*)\b/g
const localAreaRex = /\{[^{}]*\b(?:let|const|var|function)\b[^{}]*\}/g
const commentsRex = /\/\*([^*]|\*[^/])*\*\/|\/\/.*/g
let setupText = ''
let retNames = ''

new MutationObserver((mutations, observer) => {
  for (const mutation of mutations) {
    const el = mutation.target as HTMLElement
    if (el.tagName === 'SCRIPT' && el.hasAttribute('setup')) {
      setupText = el.textContent!
      el.remove()
      retNames = [...setupText.replace(localAreaRex, '').replace(commentsRex, '').matchAll(varRex)].flatMap(match => match[1].split(',').map(v => v.trim())).join(',')
      observer.disconnect()
    }
  }
}).observe(document, {
  childList: true,
  subtree: true,
})

document.addEventListener('DOMContentLoaded', () => {
  window.createApp({
    setup: new Function(`${setupText} return { ${retNames} }`),
  }).mount('[data-setupin-template]')
})

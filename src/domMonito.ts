export function domMonito() {
  const sign = {
    script: false,
    template: false,
  }
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element) {
          if (node.tagName === 'SCRIPT' && node.hasAttribute('setup')) {
            if (node.parentNode !== document.head) {
              node.textContent = '/* Resolved to the wrong location */'
            }
            else {
              sign.script = true
              /* parseScript */
            }
          }
          if (node.tagName === 'TEMPLATE' && node.parentNode === document.head) {
            sign.template = true
            /* parseTemplate */
          }
        }
      })
    }
  })
  observer.observe(document, {
    childList: true,
    subtree: true,
  })
  document.addEventListener('DOMContentLoaded', () => {
    if (!sign.script) {
      console.warn('not found <script setup> in root node')
    }
    if (!sign.template) {
      console.error('not found <template> in root node')
    }
    observer.disconnect()
  })
}

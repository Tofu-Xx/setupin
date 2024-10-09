import { Vue } from './assets/vue.js'
import { parseSetup } from './tools/parseSetup'
import { parseTemplate } from './tools/parseTemplate'

let setupText: string
const callback = function (mutations: MutationRecord[], observer: MutationObserver) {
  for (const mutation of mutations) {
    const el = mutation.target as HTMLElement
    if (el.tagName === 'SCRIPT' && el.hasAttribute('setup')) {
      setupText = el.textContent!
      el.remove()
      observer.disconnect()
    }
  }
}
const observer = new MutationObserver(callback)

observer.observe(document, {
  childList: true,
  subtree: true,
})

window.Vue = Vue
for (const k in Vue)
  window[k] = Vue[k]

document.addEventListener('DOMContentLoaded', () => {
  parseTemplate()
  parseSetup(setupText)
})

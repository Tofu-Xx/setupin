import { parse } from './parse'
import './loadVue'

let App: any

new MutationObserver(async (mutations, observer) => {
  for await (const mutation of mutations) {
    let doneTemplate = false
    let doneScript = false
    const el = mutation.target as HTMLElement
    const template = el.querySelector('template')
    if (template && document.body && !doneTemplate) {
      const templateContent = template.content.cloneNode(true)
      document.body.replaceChildren(templateContent)
      document.body.setAttribute('data-setupin-template', '')
      template.remove()
      doneTemplate = true
    }
    if (el.tagName === 'SCRIPT' && el.hasAttribute('setup') && !doneScript) {
      App = parse(el as HTMLScriptElement)
      el.remove()
      doneScript = true
    }
    if (doneTemplate && doneScript) {
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

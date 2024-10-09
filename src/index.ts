import { Vue } from './assets/vue.js'
import { parseSetup } from './tools/parseSetup'
import { parseTemplate } from './tools/parseTemplate'

let setupText: string
const callback = function (mutations: MutationRecord[]) {
  for (const mutation of mutations) {
    const target = mutation.target as HTMLElement
    if (target.tagName === 'SCRIPT' && target.hasAttribute('setup')) {
      setupText = target.textContent!
      target.remove()
    }
    const template = [...target.children].find(el => el.tagName === 'TEMPLATE')
    if (target.tagName === 'HEAD' && template) {
      parseTemplate(template)
      window.createApp(parseSetup(setupText)).mount(document.body)
    }
  }
}
const observer = new MutationObserver(callback)

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
})

window.Vue = Vue
for (const k in Vue)
  window[k] = Vue[k]

import { Vue } from './assets/vue.js'
import { getExposedName, parseTemplate } from './tools'

let scriptText = ''
const callback = function (mutations: MutationRecord[]) {
  for (const mutation of mutations) {
    const target = mutation.target as HTMLElement
    if (target.tagName === 'SCRIPT' && target.hasAttribute('setup')) {
      scriptText = target.textContent || ''
      target.setAttribute('src', '')
    }
    const template = [...target.children].find(el => el.tagName === 'TEMPLATE')
    if (target.tagName === 'HEAD' && template) {
      parseTemplate()
      window.createApp({
        setup: new Function(`${scriptText} return { ${getExposedName(scriptText).join(',')} }`),
      }).mount(document.body)
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

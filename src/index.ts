import { Vue } from './assets/vue.js'
import { observe } from './observe'
import { parse } from './parse'

window.Vue = Vue

let App: any

observe('template', (template) => {
  if (!document.body) return true
  const templateContent = template.content.cloneNode(true)
  document.body.replaceChildren(templateContent)
  document.body.setAttribute('data-setupin-template', '')
  template.remove()
})

observe('script[setup]', (script) => {
  App = parse(script)
  script.remove()
})

document.addEventListener('DOMContentLoaded', () => {
  (Vue as any).createApp(App).mount('[data-setupin-template]')
})

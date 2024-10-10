import { observe } from './observe'
import { parse } from './parse'
import './loadVue'

let App: any

observe('template', (template) => {
  const templateContent = template.content.cloneNode(true)
  document.body.replaceChildren(templateContent)
  document.body.setAttribute('data-setupin-template', '')
  template.remove()
}, () => !!document.body)

observe('script[setup]', (script) => {
  App = parse(script)
  script.remove()
})

document.addEventListener('DOMContentLoaded', () => {
  window.createApp(App).mount('[data-setupin-template]')
})

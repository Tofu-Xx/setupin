import { Vue } from './assets/vue.js'
import { observe } from './observe'
import { parseSetup } from './parseSetup'
import { parseTemplate } from './parseTemplate';

(window as any).Vue = Vue

let App: any
let Template: any

observe('body', (body) => {
  Template = parseTemplate(body)
})

observe('script[setup]', (script) => {
  App = parseSetup(script)
})

document.addEventListener('DOMContentLoaded', () => {
  if (!App) console.warn('No setup found')
  ;(Vue as any).createApp(App).mount(Template)
})

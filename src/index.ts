import { Vue } from './assets/vue.js'
import { observe } from './observe'
import { parseSetup } from './parseSetup'
import { parseTemplate } from './parseTemplate'

(window as any).Vue = Vue

let App: any
let hasSetup = false

observe({
  'body': parseTemplate,
  'script[setup]': (script) => {
    hasSetup = true
    App = parseSetup(script)
  },
})

document.addEventListener('DOMContentLoaded', () => {
  (Vue as any).createApp(App).mount(document.body)
  hasSetup || console.warn('No setup found')
})

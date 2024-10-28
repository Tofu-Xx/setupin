import { Vue } from './assets/vue.js'
import { observe } from './observe'
import { parseSetup } from './parseSetup'
import { parseTemplate } from './parseTemplate'

(window as any).Vue = Vue

const observed = observe({
  'body': parseTemplate,
  'script[setup]': parseSetup,
})

document.addEventListener('DOMContentLoaded', async () => {
  const App = await observed['script[setup]']
  const Template = await observed.body
  (Vue as any).createApp(App).mount(Template)
})

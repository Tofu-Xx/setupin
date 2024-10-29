import { Vue } from './assets/vue'
import { observe } from './observe'
import { parseSetup } from './parseSetup'
import { parseTemplate } from './parseTemplate'
import { loaded } from './tools'

(window as any).Vue = Vue

const observed = observe({
  'script[setup]': parseSetup,
  'body': parseTemplate,
})

loaded(async () => {
  const [App, Template] = await Promise.all(Object.values(observed))
  ;(Vue as any).createApp(App).mount(Template)
})

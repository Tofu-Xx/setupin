// import * as esmVue from 'https://unpkg.com/vue/dist/vue.esm-browser.js'
// import { ref } from 'vue'
// import { Vue } from './assets/vue'
import { observe } from './observe'
import { parseSetup } from './parseSetup'
import { parseTemplate } from './parseTemplate'
import { loaded } from './tools'

// console.log(ref)
// console.log(Vue)
// console.log(esmVue)

const observed = observe({
  'script[setup]': parseSetup,
  'body': parseTemplate,
})

// console.log(esmVue, Vue, vue)

loaded(async () => {
  const [App, Template] = await Promise.all(Object.values(observed))
  const Vue = await import('https://unpkg.com/vue/dist/vue.esm-browser.prod.js')
  ;(window as any).Vue = Vue
  ;(Vue as any).createApp(App).mount(Template)
})

import { observe } from './observe'
import { parseSetup } from './parseSetup'
import { parseTemplate } from './parseTemplate'
import { loaded } from './tools'

const observed = observe({
  'script[setup]': parseSetup,
  'body': parseTemplate,
})

loaded(async () => {
  const [{ setupText, retNames }, Template] = await Promise.all(Object.values(observed))
  const Vue = await import('https://unpkg.com/vue/dist/vue.esm-browser.prod.js')
  ;(window as any).Vue = Vue
  ;(Vue as any).createApp({
    setup: new Function(`const { ${Object.keys(Vue)} } = Vue; ${setupText} return { ${retNames} }`),
  }).mount(Template)
})

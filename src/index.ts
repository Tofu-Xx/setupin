// import { Vue } from './assets/vue'
import { observe } from './observe'
import { parseSetup } from './parseSetup'
import { parseTemplate } from './parseTemplate'
import { loaded } from './tools'

const oTemplate = observe('body', parseTemplate)
const oSetup = observe('script[setup]', parseSetup)

loaded(async () => {
  const [{ setupText, retNames }, Template] = await Promise.all([oSetup, oTemplate])
  const Vue = window.Vue = await import('https://unpkg.com/vue/dist/vue.esm-browser.prod.js')
  Vue.createApp({
    setup: new Function(`const { ${Object.keys(Vue)} } = Vue; ${setupText} return { ${retNames} }`) as Fn,
  }).mount(Template)
})

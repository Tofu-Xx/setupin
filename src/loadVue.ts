import { Vue } from './assets/vue.js'

window.Vue = Vue
for (const k in Vue) window[k] = Vue[k]

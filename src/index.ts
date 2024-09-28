import { Vue } from './assets/vue.js'
import { getExposed, getSetupScriptText, parseTemplate, proxyCall } from './tools'

declare global {
  interface Window {
    [key: string]: any
  }
}
window.Vue = Vue
for (const k in Vue) {
  window[k] = Vue[k]
}
const portal = proxyCall([
  'onMounted',
  'onUpdated',
  'onUnmounted',
  'onBeforeMount',
  'onBeforeUpdate',
  'onBeforeUnmount',
], Vue)
document.addEventListener('DOMContentLoaded', () => {
  parseTemplate()
  const scriptText = getSetupScriptText()
  if (scriptText === void 0) return
  const App = {
    setup() {
      portal.call()
      return getExposed(scriptText)
    },
  }
  window.createApp(App).mount(document.body)
})

import { Vue } from './assets/vue.js'
import { getExposedName, getSetupScriptText, parseTemplate } from './tools'

window.Vue = Vue
for (const k in Vue)
  window[k] = Vue[k]
document.addEventListener('DOMContentLoaded', () => {
  parseTemplate()
  const scriptText = getSetupScriptText()
  window.createApp({
    setup: new Function(`${scriptText} return { ${getExposedName(scriptText).join(',')} }`),
  }).mount(document.body)
})

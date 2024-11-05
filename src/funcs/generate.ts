import type { ParsedScript, ParsedTemplate } from './parse'
import asciiLogoRaw from '@/asset/ascii-logo.txt?raw'
import * as Vue from 'vendor:vue'

export function generate(templateCode: ParsedTemplate, context: ParsedScript) {
  document.body.innerHTML = templateCode
  const asciiLogo = import.meta.env.MODE === 'development' ? asciiLogoRaw : ''
  const demandRex = new RegExp(`\\b${Object.keys(window.Vue = Vue).join('\\b|\\b')}\\b`, 'g')
  const { scriptEl, importsCode, setupCode, retNames, isAsync } = context
  const async = isAsync ? 'async' : ''
  const appComp = `{template:document.body.innerHTML,${async} setup(){${setupCode}return{${retNames}}}}`
  const suspenseComp = `{components:{c:${appComp}},template:'<Suspense><c/></Suspense>'}`
  const createApp = `createApp(${isAsync ? suspenseComp : appComp}).mount(document.body);`
  const autoImport = `const {createApp,${[...new Set(setupCode.match(demandRex))]}}=Vue;`
  scriptEl!.innerHTML = asciiLogo + importsCode + autoImport + createApp
}

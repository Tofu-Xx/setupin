import type { Context } from './parse'
import * as Vue from 'vendor:vue'

export function generate(templateCode: string, context: Context) {
  document.body.innerHTML = templateCode
  const demandRex = new RegExp(`\\b${Object.keys(window.Vue = Vue).join('\\b|\\b')}\\b`, 'g')
  const { importsCode, setupCode, retNames, isAsync } = context
  const async = isAsync ? 'async' : ''
  const appComp = `{template:document.body.innerHTML,${async} setup(){${setupCode}return{${retNames}}}}`
  const suspenseComp = `{components:{c:${appComp}},template:'<Suspense><c/></Suspense>'}`
  const createApp = `createApp(${isAsync ? suspenseComp : appComp}).mount(document.body);`
  const autoImport = `const {createApp,${[...new Set(setupCode.match(demandRex))] ?? ''}}=Vue;`
  return importsCode + autoImport + createApp
}

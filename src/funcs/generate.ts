import type { ParsedScript } from './parse'
// import asciiLogoRaw from '@/asset/ascii-logo.txt?raw'
// import * as Vue from 'vendor:vue'
import * as Vue from '@vendor/vue.esm'

export function generate(context: Omit<ParsedScript, 'scriptEl'>) {
  // const asciiLogo = import.meta.env.MODE === 'development' ? asciiLogoRaw : ''
  const demandRex = new RegExp(`\\b${Object.keys(Vue).join('\\b|\\b')}\\b`, 'g')
  const { importsCode, setupCode, retNames, isAsync } = context
  const async = isAsync ? 'async' : ''
  const appComp = `{template:document.body.innerHTML,${async} setup(){${setupCode}return{${retNames}}}}`
  const suspenseComp = `{components:{c:${appComp}},template:'<Suspense><c/></Suspense>'}`
  const createApp = `createApp(${isAsync ? suspenseComp : appComp}).mount(document.body);`
  const autoImport = `const {createApp,${[...new Set(setupCode.match(demandRex))]}}=Vue;`
  return /* asciiLogo + */ importsCode + autoImport + createApp
}

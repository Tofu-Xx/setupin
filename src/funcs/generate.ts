import * as Vue from 'vendor:vue'

const demand = new RegExp(`\\b${Object.keys(window.Vue = Vue).join('\\b|\\b')}\\b`, 'g')
export function generate(context: Context) {
  const { importsCode, setupCode, retNames, isAsync } = context
  const async = isAsync ? 'async' : ''
  const appComp = `{${async} setup() {${setupCode}return {${retNames}}}}`
  const suspenseComp = `{components:{c:${appComp}},template:'<Suspense><c/></Suspense>'}`
  const createApp = `createApp(${isAsync ? suspenseComp : appComp}).mount(document.body);`
  const autoImport = `const { createApp,${setupCode.match(demand) ?? ''} } = Vue;`
  return importsCode
    + autoImport
    + createApp
}

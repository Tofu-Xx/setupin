import * as Vue from 'vendor:vue'

export function generate(context: Context) {
  const { importsCode, setupCode, retNames, isAsync } = context
  const appComp = `{
    // template: \`\${template}\`,
    ${isAsync ? 'async' : ''} setup() {${setupCode}return {${retNames}}},
  }`
  const suspenseComp = `{components:{c:${appComp}},template:'<Suspense><c/></Suspense>'}`
  const createApp = `createApp(${isAsync ? suspenseComp : appComp}).mount(document.body);`
  const autoImport = `const { ${Object.keys(window.Vue = Vue)} } = Vue;`
  return importsCode
    + autoImport
    + createApp
}

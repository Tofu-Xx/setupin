import * as Vue from './assets/vue.' + import.meta.env.VITE_VUE_VERSION

export function generate(template: string, context: Context) {
  const { importsCode, setupCode, retNames, isAsync } = context
  const appComp = `{
    template: \`${template}\`,
    ${isAsync ? 'async' : ''} setup() {${setupCode}return {${retNames}}},
  }`
  const suspenseComp = `{components:{c:${appComp}},template:'<Suspense><c/></Suspense>'}`
  const createApp = `createApp(${isAsync ? suspenseComp : appComp}).mount(document.body);`
  const autoImport = `const { ${Object.keys(window.Vue = Vue)} } = Vue;`
  const siteClear = 'document.body.textContent = "";'
  return importsCode
    + autoImport
    + siteClear
    + createApp
}
